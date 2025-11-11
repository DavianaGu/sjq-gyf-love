import React, { useState, useEffect, useRef } from "react";
import { Carousel, Card, Modal, Button, Form, Input, message, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/**
 * 未来邮局 — 二次元恋爱备忘录（已接入 MongoDB）
 * 可公开浏览，但仅固定账号 (sjq / 050828) 可编辑
 */

// ---------------- IndexedDB 封装（保持原逻辑） ----------------
const DB_NAME = "future_posts_images_db";
const DB_STORE = "images_store";
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
  });
}
async function idbPut(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(blob, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).delete(key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
// ---------------------------------------------------------------------

export default function Future() {
  const navigate = useNavigate();

  // posts 从数据库加载（若失败则 fallback localStorage）
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [objectUrlMap, setObjectUrlMap] = useState({});
  const objectUrlMapRef = useRef({});

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

  // ---------------- 后端同步逻辑 ----------------
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setPosts(data.reverse()); // 按时间倒序
      setLoading(false);
    } catch (err) {
      console.error("加载数据库失败，使用本地数据：", err);
      const local = localStorage.getItem("future_posts");
      if (local) setPosts(JSON.parse(local));
      setLoading(false);
    }
  };

  const savePostToDB = async (newPost) => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
  };

  const updatePostInDB = async (post) => {
    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  };

  const deletePostFromDB = async (id) => {
    await fetch(`/api/notes?_id=${id}`, { method: "DELETE" });
  };
  // ------------------------------------------------

  useEffect(() => {
    fetchPosts();
  }, []);

  // -------- 图片 IDB 渲染逻辑（保持原样） --------
  useEffect(() => {
    let mounted = true;
    async function ensureIdbImages() {
      const newMap = { ...objectUrlMapRef.current };
      for (const p of posts) {
        if (p?.cover?.startsWith("idb://")) {
          const key = p.cover.slice("idb://".length);
          if (!newMap[key]) {
            try {
              const blob = await idbGet(key);
              if (blob) {
                newMap[key] = URL.createObjectURL(blob);
              }
            } catch {}
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
      Object.values(objectUrlMapRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [posts]);
  // ---------------------------------------------

  // 登录验证
  const handleLogin = () => {
    const { username, password } = loginForm.getFieldsValue();
    if (username === "sjq" && password === "050828") {
      setIsLogin(true);
      setLoginModal(false);
      message.success("登录成功 💕");
    } else message.error("账号或密码错误！");
  };

  // 新建
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

  // 删除
  const handleDelete = async (id) => {
    const ok = window.confirm("确定删除这条记录吗？");
    if (!ok) return;
    setPosts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    try {
      await deletePostFromDB(id);
      message.success("删除成功");
    } catch (e) {
      message.warn("数据库删除失败，可能是本地数据");
    }
  };

  // base64 转 blob
  async function dataURLtoBlob(dataUrl) {
    const res = await fetch(dataUrl);
    return await res.blob();
  }

  // 上传预览
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // 提交保存
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        let coverValue = values.cover || "";
        if (coverValue.startsWith("data:")) {
          const key = "img_" + Date.now();
          try {
            const blob = await dataURLtoBlob(coverValue);
            await idbPut(key, blob);
            coverValue = "idb://" + key;
            const url = URL.createObjectURL(blob);
            objectUrlMapRef.current[key] = url;
            setObjectUrlMap({ ...objectUrlMapRef.current });
          } catch {}
        }

        const finalPost = { ...values, cover: coverValue };

        if (editingPost) {
          // 更新
          const updated = { ...editingPost, ...finalPost };
          setPosts((prev) =>
            prev.map((p) => (p._id === updated._id || p.id === updated.id ? updated : p))
          );
          try {
            await updatePostInDB(updated);
            message.success("修改成功");
          } catch {
            message.warn("数据库更新失败，仅保存在本地");
          }
        } else {
          // 新增
          const newPost = { ...finalPost, id: Date.now() };
          setPosts((prev) => [newPost, ...prev]);
          try {
            await savePostToDB(newPost);
            message.success("添加成功");
          } catch {
            message.warn("数据库保存失败，仅保存在本地");
          }
        }

        setEditModal(false);
        localStorage.setItem("future_posts", JSON.stringify(posts));
      } catch (err) {
        console.error("保存出错：", err);
        message.error("保存失败，请重试。");
      }
    });
  };

  const getDisplayCover = (cover) => {
    if (!cover) return "";
    if (cover.startsWith("idb://")) {
      const key = cover.slice("idb://".length);
      return objectUrlMap[key] || "";
    }
    return cover;
  };

  if (loading) return <p style={{ textAlign: "center", padding: 100 }}>加载中...</p>;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #fff0f6 0%, #f0f9ff 100%)",
        minHeight: "100vh",
        fontFamily: "'Comic Neue', 'Poppins', sans-serif",
      }}
    >
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

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <h1 style={{ fontSize: "30px", color: "#ff69b4" }}>💌 未来邮局</h1>
        <p style={{ color: "#666", fontSize: "15px" }}>致未来的我们，记录凡凡的专属恋爱指南 🌸</p>
        {isLogin ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新建记录
          </Button>
        ) : (
          <Button onClick={() => setLoginModal(true)}>管理员登录</Button>
        )}
      </div>

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
            key={post._id || post.id}
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
                  onClick={() => handleDelete(post._id || post.id)}
                >
                  删除
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <Button size="large" onClick={() => navigate("/")}>
          🔙 返回主页
        </Button>
      </div>

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
          <Form.Item name="cover" label="封面图">
            <Input placeholder="可粘贴图片链接，或下方上传图片" style={{ marginBottom: 10 }} />
            <Upload
              showUploadList={false}
              accept="image/*"
              beforeUpload={(file) => {
                getBase64(file, (url) => {
                  form.setFieldsValue({ cover: url });
                  message.success("图片上传成功");
                });
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
