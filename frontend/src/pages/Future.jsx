import React, { useState, useEffect, useRef } from "react";
import { Carousel, Card, Modal, Button, Form, Input, message, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/**
 * 未来邮局 — 二次元恋爱备忘录
 * 可公开浏览，但仅固定账号 (sjq / 050828) 可编辑
 *
 * 说明（实现细节，仅供阅读）：
 * - posts 的元数据（id/title/content/cover）仍保存在 localStorage（future_posts）。
 * - 实际的图片大文件（base64 或 blob）保存到 IndexedDB，localStorage 中的 cover
 *   若对应 IDB 存储，则格式为 "idb://<key>"。
 * - 渲染时会把 idb://... 从 IDB 读取为 blob 并创建 objectURL 供 <img src=...> 使用。
 * - 我做了错误处理：若 IDB 中没有对应 blob，将回退显示为空或外链（不影响其他功能）。
 *
 * 注意：此文件不改动你的 UI、图标或交互，只加入了持久化图片的实现。
 */

// --------- IndexedDB 简单封装（用于保存与读取图片 blob） ----------
const DB_NAME = "future_posts_images_db";
const DB_STORE = "images_store";
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };
  });
}
async function idbPut(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const req = store.put(blob, key);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const req = store.delete(key);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
// ---------------------------------------------------------------------

export default function Future() {
  const navigate = useNavigate();

  // 安全读取 localStorage（防止 parse 抛错）
  let savedPosts = null;
  try {
    const raw = localStorage.getItem("future_posts");
    if (raw) savedPosts = JSON.parse(raw);
  } catch (e) {
    console.warn("读取 future_posts 失败，已忽略。", e);
    try {
      localStorage.removeItem("future_posts");
    } catch (ee) {}
    savedPosts = null;
  }

  // posts 保留实际存储格式：cover 可能是外链、data:...（短期会话）或 idb://<key>（持久）
  const [posts, setPosts] = useState(
    savedPosts || [
      {
        id: 1,
        title: "恋爱小贴士 · 初遇",
        content:
          "遇到喜欢的人时，不要急着靠近，也别刻意疏远。温柔地了解，是最好的开始。",
        cover:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        title: "寄往未来的一封信",
        content:
          "希望未来的我们仍能互相理解，互相扶持。每一次心动都值得被记录。",
        cover:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      },
    ]
  );

  // objectUrlMap: key -> objectURL，用于把 idb://xxx 映射为可用于 <img> 的 URL
  const [objectUrlMap, setObjectUrlMap] = useState({});
  // 用 ref 保存当前 object URLs，方便 cleanup（revoke）
  const objectUrlMapRef = useRef({});
  // 当组件卸载时清理创建的 object URLs
  useEffect(() => {
    return () => {
      Object.values(objectUrlMapRef.current).forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });
      objectUrlMapRef.current = {};
    };
  }, []);

  // 当加载 posts（初始或更新）时，为所有 idb://... 的 cover 从 IndexedDB 读取 blob 并创建 objectURL
  useEffect(() => {
    let mounted = true;
    async function ensureIdbImages() {
      const newMap = { ...objectUrlMapRef.current };
      for (const p of posts) {
        if (p && typeof p.cover === "string" && p.cover.startsWith("idb://")) {
          const key = p.cover.slice("idb://".length);
          if (!newMap[key]) {
            try {
              const blob = await idbGet(key);
              if (blob) {
                const url = URL.createObjectURL(blob);
                newMap[key] = url;
              } else {
                // idb 中找不到对应 blob（可能被清除），保持为空（界面则显示空或外链）
                console.warn("IDB 中未找到图片：", key);
              }
            } catch (e) {
              console.error("从 IDB 读取图片失败：", key, e);
            }
          }
        }
      }
      if (mounted) {
        objectUrlMapRef.current = newMap;
        setObjectUrlMap({ ...newMap });
      }
    }
    ensureIdbImages();
    return () => {
      mounted = false;
    };
  }, [posts]);

  // 每次 posts 改变时，保存 posts 的元数据到 localStorage（不把大 blob 写入 localStorage）
  useEffect(() => {
    try {
      // 保存 posts 原样（cover 可为 idb:// 或 外链 或 空字符串）
      localStorage.setItem("future_posts", JSON.stringify(posts));
    } catch (err) {
      // 如果发生写入异常（极少发生，因为 we don't put large base64 into posts anymore）
      console.warn("保存 future_posts 到 localStorage 失败：", err);
      try {
        // 降级：移除任何以 data: 开头的 cover（不应太常见，因为我们会把上传的 base64 转入 IDB）
        const safe = posts.map((p) => {
          if (p && typeof p.cover === "string" && p.cover.startsWith("data:")) {
            return { ...p, cover: "" };
          }
          return p;
        });
        localStorage.setItem("future_posts", JSON.stringify(safe));
        message.warn("本地存储空间不足，已移除部分大图片的本地持久化（刷新后需重新上传）。");
      } catch (e2) {
        console.error("降级保存也失败：", e2);
      }
    }
  }, [posts]);

  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();

  const banners = [
    "/future/banner1.jpg",
    "/future/banner2.webp",
    "/future/banner3.png",
    "/future/banner4.png",
    "/future/banner5.jpg",
  ];

  // 登录验证
  const handleLogin = () => {
    const { username, password } = loginForm.getFieldsValue();
    if (username === "sjq" && password === "050828") {
      setIsLogin(true);
      setLoginModal(false);
      message.success("登录成功 💕");
    } else {
      message.error("账号或密码错误！");
    }
  };

  // 新建记录
  const handleAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setEditModal(true);
  };

  // 编辑
  const handleEdit = (post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setEditModal(true);
  };

  // 删除：除了从 posts 中删除元数据，还尝试删除 IDB 中对应图片（如果以 idb:// 开头）
  const handleDelete = (id) => {
    const ok = window.confirm("确定删除这条记录吗？");
    if (ok) {
      // 如果要删除对应的 idb image，也去删除
      const target = posts.find((p) => p.id === id);
      if (target && typeof target.cover === "string" && target.cover.startsWith("idb://")) {
        const key = target.cover.slice("idb://".length);
        idbDelete(key).catch((e) => console.warn("删除 IDB 图片失败：", e));
        // 释放 objectURL（如果存在）
        if (objectUrlMapRef.current[key]) {
          try {
            URL.revokeObjectURL(objectUrlMapRef.current[key]);
          } catch (e) {}
          delete objectUrlMapRef.current[key];
        }
        setObjectUrlMap({ ...objectUrlMapRef.current });
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
      message.success("删除成功");
    }
  };

  // 将 dataURL 转为 blob 的小工具（使用 fetch 简单转换）
  async function dataURLtoBlob(dataUrl) {
    // fetch on data URL returns Response which can be converted to blob
    const res = await fetch(dataUrl);
    return await res.blob();
  }

  // 处理文件上传为 base64（仍然用于在表单中即时显示）
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // 保存帖子（在这里，如果 cover 是 data:... 则把图片写入 IDB，并把 cover 改为 idb://<key>）
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        let coverValue = values.cover || "";
        // 如果 cover 是 data:... (base64)，则写入 IDB 并替换为 idb://key
        if (typeof coverValue === "string" && coverValue.startsWith("data:")) {
          // 生成唯一 key：use timestamp + random
          const key = "img_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
          try {
            const blob = await dataURLtoBlob(coverValue);
            await idbPut(key, blob);
            coverValue = "idb://" + key;
            // 创建 objectURL 并存入 map 以便立即显示
            const url = URL.createObjectURL(blob);
            objectUrlMapRef.current[key] = url;
            setObjectUrlMap({ ...objectUrlMapRef.current });
          } catch (e) {
            console.error("写入 IDB 失败，回退为临时 base64 显示：", e);
            message.warn("图片保存到本地失败（浏览器限制），仅在本次会话可见。");
            // coverValue 保持为原始 base64（但 localStorage 保存会剔除它）
          }
        }

        const finalValues = { ...values, cover: coverValue };

        if (editingPost) {
          setPosts((prev) =>
            prev.map((p) => (p.id === editingPost.id ? { ...p, ...finalValues } : p))
          );
          message.success("修改成功");
        } else {
          const newPost = { ...finalValues, id: Date.now() };
          setPosts((prev) => [newPost, ...prev]);
          message.success("添加成功");
        }
        setEditModal(false);
      } catch (err) {
        console.error("保存帖子出错：", err);
        message.error("保存失败，请重试。");
      }
    });
  };

  // 渲染时，给定 post.cover 返回实际用于 <img src> 的地址（外链，或者 IDB 创建的 objectURL，或者空）
  const getDisplayCover = (cover) => {
    if (!cover) return "";
    if (typeof cover === "string" && cover.startsWith("idb://")) {
      const key = cover.slice("idb://".length);
      return objectUrlMap[key] || ""; // 若 objectURL 尚未加载好，会返回空字符串（可在稍后自动填充）
    }
    return cover; // 外链或 base64 临时字符串
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #fff0f6 0%, #f0f9ff 100%)",
        minHeight: "100vh",
        fontFamily: "'Comic Neue', 'Poppins', sans-serif",
      }}
    >
      {/* 顶部横幅 */}
      <Carousel autoplay effect="fade" style={{ height: "700px", overflow: "hidden" }}>
        {banners.map((src, i) => (
          <div key={i}>
            <div style={{ position: "relative", width: "100%", height: "700px" }}>
              <img
                src={src}
                alt="banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(1.05) saturate(1.2)",
                  transition: "transform 1s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,240,246,1) 90%)",
                }}
              ></div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 标题区 */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <h1 style={{ fontSize: "30px", color: "#ff69b4", textShadow: "1px 1px 2px #fff" }}>
          💌 未来邮局
        </h1>
        <p style={{ color: "#666", fontSize: "15px" }}>
          致未来的我们，记录凡凡的专属恋爱指南 🌸
        </p>
        {isLogin ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新建记录
          </Button>
        ) : (
          <Button onClick={() => setLoginModal(true)}>管理员登录</Button>
        )}
      </div>

      {/* 卡片展示区 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
          padding: "0 20px 60px",
        }}
      >
        {posts.map((post) => (
          <Card
            key={post.id}
            hoverable
            cover={
              post.cover ? (
                <img
                  src={getDisplayCover(post.cover)}
                  alt="封面"
                  style={{ height: 160, objectFit: "cover" }}
                />
              ) : null
            }
            style={{
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 2px 10px rgba(255,182,193,0.3)",
            }}
          >
            <Card.Meta title={post.title} description={post.content} />
            {isLogin && (
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <Button size="small" onClick={() => handleEdit(post)}>
                  编辑
                </Button>
                <Button
                  size="small"
                  danger
                  style={{ marginLeft: 8 }}
                  onClick={() => handleDelete(post.id)}
                >
                  删除
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* 返回主页按钮 */}
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <Button size="large" onClick={() => navigate("/")}>
          🔙 返回主页
        </Button>
      </div>

      {/* 登录弹窗 */}
      <Modal
        open={loginModal}
        title="管理员登录"
        onCancel={() => setLoginModal(false)}
        onOk={handleLogin}
      >
        <Form form={loginForm} layout="vertical">
          <Form.Item
            name="username"
            label="账号"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="输入密码" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑/添加弹窗 */}
      <Modal
        open={editModal}
        title={editingPost ? "编辑记录" : "新建记录"}
        onCancel={() => setEditModal(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input placeholder="输入标题" />
          </Form.Item>
          <Form.Item name="content" label="正文" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="写下你的信件或感悟..." />
          </Form.Item>

          {/* ✅ 上传或填写封面（UI 与你原来完全一致） */}
          <Form.Item name="cover" label="封面图">
            <Input
              placeholder="可粘贴图片链接，或下方上传图片"
              style={{ marginBottom: 10 }}
            />
            <Upload
              showUploadList={false}
              accept="image/*"
              beforeUpload={(file) => {
                // 先把图片转 base64 以便在表单中即时预览
                getBase64(file, (url) => {
                  form.setFieldsValue({ cover: url });
                  message.success("图片上传成功");
                });
                // 阻止自动上传
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>从相册选择图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}