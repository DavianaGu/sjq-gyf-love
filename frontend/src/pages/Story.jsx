// src/pages/Story.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "sjq_gyf_timeline_v1";
const correctPassword = "050828"; // 固定密码

export default function Story() {
  const [timeline, setTimeline] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwdInput, setPwdInput] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    note: "",
    imgData: "",
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const navigate = useNavigate();

  const SAMPLE = [
    { date: "2025-01-14", title: "第一次见面", note: "那天的笑容，是我心动的开始。", img: "/images/IMG_6824.jpg" },
    { date: "2025-03-02", title: "第一次约会", note: "阳光洒在脸上，连空气都在微甜。", img: "/images/IMG_6885.jpeg" },
    { date: "2025-05-08", title: "第一次旅行", note: "海风拂面，我们的故事继续写下去。", img: "/images/IMG_7216.jpg" },
  ];

  // 初始化
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setTimeline(JSON.parse(raw)); } catch { setTimeline(SAMPLE); }
    } else {
      setTimeline(SAMPLE);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timeline));
    } catch {
      console.warn("localStorage 容量超限，事件已保存但图片可能未存。");
    }
    adjustLineHeight();
  }, [timeline]);

  // 星空背景
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight * 1.4);
    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6,
      vy: 0.1 + Math.random() * 0.4,
      alpha: 0.35 + Math.random() * 0.65,
    }));

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight * 1.4;
    }
    window.addEventListener("resize", resize);

    let raf;
    function anim() {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0f172a");
      g.addColorStop(0.35, "#08102a");
      g.addColorStop(1, "#061022");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      for (let s of stars) {
        s.y += s.vy;
        if (s.y > H) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,205,255,${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#bfe0ff";
        ctx.fill();
      }
      raf = requestAnimationFrame(anim);
    }
    anim();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const adjustLineHeight = () => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;
    line.style.height = `${container.clientHeight + 60}px`;
  };

  useEffect(() => {
    const t = setTimeout(adjustLineHeight, 120);
    window.addEventListener("resize", adjustLineHeight);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", adjustLineHeight);
    };
  }, []);

  // 登录逻辑
  const handleLogin = (e) => {
    e?.preventDefault();
    if (pwdInput === correctPassword) {
      setLoggedIn(true);
      setPwdInput("");
      alert("登录成功，可以编辑时间线啦！");
    } else { alert("密码错误，请重试"); }
  };
  const handleLogout = () => { setLoggedIn(false); alert("已登出"); };

  // 文件上传（可选）并压缩
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 300; // 压缩宽度
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.6);
        setFormData((s) => ({ ...s, imgData: compressed }));
      };
    };
    reader.readAsDataURL(f);
  };

  // 新增事件（上传图片可选）
  const handleAdd = (e) => {
    e.preventDefault();
    const { date, title, note, imgData } = formData;
    if (!date || !title) { alert("请填写日期和标题。"); return; }
    setTimeline((t) => [...t, { date, title, note, img: imgData || "" }]);
    setFormData({ date: "", title: "", note: "", imgData: "" });
    setShowAddForm(false);
  };

  // 删除事件
  const handleDelete = (idx) => {
    if (!window.confirm("确认删除该事件？")) return;
    setTimeline((t) => t.filter((_, i) => i !== idx));
  };

  const sorted = [...timeline].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ position: "relative", minHeight: "100vh", color: "#f8fbff" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <button onClick={() => navigate("/")} style={{ position: "fixed", top: 20, left: 20, zIndex: 50, background: "linear-gradient(135deg,#a5e3ff,#6fb3ff)", border: "none", borderRadius: 30, padding: "10px 18px", fontSize: 15, color: "#003366", cursor: "pointer", boxShadow: "0 0 12px rgba(120,200,255,0.6)", transition: "all 0.3s ease" }} onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")} onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>← 返回主页</button>

      <div style={{ position: "relative", zIndex: 5, paddingTop: 60, paddingBottom: 12, textAlign: "center" }}>
        <h2 style={{ fontSize: 34, margin: 0, fontWeight: 800 }}>✨ 我们的故事 ✨</h2>
        <div style={{ marginTop: 10 }}>
          {!loggedIn ? (
            <form onSubmit={handleLogin} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <input type="password" value={pwdInput} onChange={(e) => setPwdInput(e.target.value)} placeholder="输入密码以编辑" style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff" }} />
              <button type="submit" style={{ padding: "8px 12px", borderRadius: 10, background: "linear-gradient(90deg,#6fb3ff,#3a87ff)", color: "#fff", border: "none", cursor: "pointer" }}>登录</button>
            </form>
          ) : (
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => setShowAddForm((s) => !s)} style={{ padding: "8px 12px", borderRadius: 10, background: "linear-gradient(90deg,#ff9ab3,#ff7ab3)", color: "#fff", border: "none", cursor: "pointer" }}>
                {showAddForm ? "取消新增" : "➕ 新增事件"}
              </button>
              <button onClick={handleLogout} style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>登出</button>
            </div>
          )}
        </div>
      </div>

      <div ref={containerRef} style={{ position: "relative", zIndex: 5, width: "100%", maxWidth: 980, margin: "20px auto 80px", padding: "30px 18px" }}>
        <div ref={lineRef} style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 6, borderRadius: 9999, background: "linear-gradient(180deg,#9be2ff,#ffd0ea,#b8a9ff)", boxShadow: "0 6px 24px rgba(90,160,255,0.18)", top: 40, zIndex: 2 }} />

        {showAddForm && loggedIn && (
          <form onSubmit={handleAdd} style={{ marginBottom: 18, background: "rgba(255,255,255,0.04)", padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="date" value={formData.date} onChange={(e) => setFormData((s) => ({ ...s, date: e.target.value }))} required style={{ padding: 8, borderRadius: 8, border: "none", minWidth: 150 }} />
              <input type="text" placeholder="事件标题" value={formData.title} onChange={(e) => setFormData((s) => ({ ...s, title: e.target.value }))} required style={{ padding: 8, borderRadius: 8, border: "none", minWidth: 200 }} />
              <input type="text" placeholder="图片链接（可选）" value={formData.imgData.startsWith("data:") ? "" : formData.imgData} onChange={(e) => setFormData((s) => ({ ...s, imgData: e.target.value }))} style={{ padding: 8, borderRadius: 8, border: "none", minWidth: 240 }} />
              <input type="file" accept="image/*" onChange={handleFile} style={{ padding: 6, borderRadius: 8 }} />
            </div>
            <textarea placeholder="备注（可选）" value={formData.note} onChange={(e) => setFormData((s) => ({ ...s, note: e.target.value }))} style={{ marginTop: 8, width: "100%", padding: 8, borderRadius: 8, border: "none" }} />
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button type="submit" style={{ padding: "8px 12px", borderRadius: 8, background: "linear-gradient(90deg,#6fb3ff,#3a87ff)", color: "#fff", border: "none", cursor: "pointer" }}>保存事件</button>
              <button type="button" onClick={() => { setShowAddForm(false); setFormData({ date: "", title: "", note: "", imgData: "" }); }} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.06)" }}>取消</button>
            </div>
          </form>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {sorted.map((it, idx) => {
            const left = idx % 2 === 0;
            const originalIndex = timeline.indexOf(it);
            return (
              <div key={idx} style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", gap: 20, position: "relative" }}>
                <div style={{ width: 320, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.03))", borderRadius: 14, padding: 12, boxShadow: "0 10px 30px rgba(3,20,45,0.45)", border: "1px solid rgba(255,255,255,0.04)", color: "#e6f6ff" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 90, height: 90, borderRadius: 12, overflow: "hidden" }}>
                      <img src={it.img || "/images/placeholder-photo.jpg"} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{it.title}</div>
                      <div style={{ fontSize: 12, color: "#bfe0ff", marginBottom: 6 }}>{it.date}</div>
                      {it.note && <div style={{ fontSize: 13, color: "#d9f0ff" }}>{it.note}</div>}
                      {loggedIn && (
                        <div style={{ marginTop: 8 }}>
                          <button onClick={() => handleDelete(originalIndex)} style={{ padding: "6px 8px", borderRadius: 8, background: "rgba(255,80,120,0.08)", color: "#ffd7e6", border: "1px solid rgba(255,80,120,0.14)" }}>删除</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: 9999, background: "radial-gradient(circle at 30% 30%, #ffffff, #a8e7ff)", border: "3px solid rgba(255,255,255,0.9)", boxShadow: "0 6px 20px rgba(58,135,255,0.28)", transform: "translateX(-50%)", marginLeft: left ? -40 : 40 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}