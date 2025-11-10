import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [timeTogether, setTimeTogether] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
  ];

  // 每5秒切换图片
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 恋爱计时器
  useEffect(() => {
    const start = new Date("2025-10-17T00:00:00");
    const update = () => {
      const now = new Date();
      const diff = now - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeTogether(`${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // 页面淡入动画
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 💙 改进版粒子爱心动画（亮度增强 + 持续动态闪烁）
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
      W = (canvas.width = window.innerWidth);
      H = (canvas.height = window.innerHeight * 0.8); // 照片高度不占满
    }
    resize();
    window.addEventListener("resize", resize);

    const numParticles = 720; // 粒子略少，密度适中
    const particles = [];

    function heartShape(t) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      return { x, y };
    }

    for (let i = 0; i < numParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const h = heartShape(t);
      const spread = Math.random() * 10;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: W / 2 + h.x * 17 + (Math.random() - 0.5) * spread,
        ty: H / 2 - h.y * 17 + (Math.random() - 0.5) * spread,
        speed: 0.008 + Math.random() * 0.008,
        floatOffsetX: Math.random() * 1000,
        floatOffsetY: Math.random() * 1000,
        size: Math.random() * 2.5 + 1.5,
        alpha: Math.random() * 0.5 + 0.6,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      const time = Date.now() * 0.002;
      for (let p of particles) {
        p.x += (p.tx - p.x) * p.speed;
        p.y += (p.ty - p.y) * p.speed;

        // 持续闪烁漂浮
        const floatX = Math.sin(time + p.floatOffsetX) * 2.2;
        const floatY = Math.cos(time + p.floatOffsetY) * 2.2;

        const drawX = p.x + floatX;
        const drawY = p.y + floatY;

        // 轻微闪烁
        const dynamicAlpha =
          p.alpha * (0.8 + 0.2 * Math.sin(time * 2 + p.floatOffsetX));

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,220,255,${dynamicAlpha})`;
        ctx.shadowColor = "rgba(120,220,255,1)";
        ctx.shadowBlur = 30;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center transition-opacity duration-2000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{
        fontFamily: "'Comic Sans MS','Quicksand','Poppins',cursive",
      }}
    >
      {/* 图片区域（上半部分） */}
      <div
        className="relative w-full"
        style={{
          height: "100vh",
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <canvas ref={canvasRef} className="absolute inset-0"></canvas>
      </div>

      {/* 下方文字区域 + 背景色层 */}
      <div
        className="relative z-20 w-full flex flex-col items-center justify-center pt-8 pb-16 text-center"
        style={{
          fontFamily: "'Ma Shan Zheng', 'Long Cang', cursive",
          background: "linear-gradient(180deg, rgba(255,240,245,0.9), rgba(235,245,255,0.9))",
          boxShadow: "0 0 40px rgba(255,182,193,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6 text-pink-400"
          style={{
            textShadow: "0 0 18px rgba(255,255,255,0.8)",
            letterSpacing: "2px",
          }}
        >
          <span style={{ fontFamily: "'Quicksand', 'Poppins', 'Pacifico', cursive" }}>
            SJQ
          </span>{" "}
          💗{" "}
          <span style={{ fontFamily: "'Quicksand', 'Poppins', 'Pacifico', cursive" }}>
            GYF
          </span>
        </h1>

        <div
          className="text-2xl md:text-3xl mb-4 font-semibold text-gray-700"
          style={{
            textShadow: "0 0 12px rgba(255,255,255,0.7)",
          }}
        >
          💞 我们已经在一起 💞
          <br />
          {timeTogether}
        </div>

        <p
          className="text-lg md:text-2xl italic text-gray-600 mb-8"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.7)",
            fontFamily: "'Pacifico', 'Ma Shan Zheng', cursive",
          }}
        >
          愿时光温柔相待，爱意永不散场 💫
        </p>

        {/* 💎 梦幻蓝水晶导航栏 */}
        <div className="flex justify-center flex-wrap gap-8 md:gap-12 mb-8">
          {[
            { name: "·主页                ", link: "/" },
            { name: "·我们的故事                ", link: "/story" },
            { name: "·秘语时刻                ", link: "/secrets" },
            { name: "·音乐空间                ", link: "/music" },
            { name: "·未来邮局                ", link: "/future" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="px-6 py-2 rounded-full text-lg font-semibold text-white backdrop-blur-md bg-blue-200/30 border border-blue-300/40 shadow-[0_0_20px_rgba(173,216,255,0.4)] transition-all duration-500 hover:bg-blue-300/50 hover:shadow-[0_0_30px_rgba(173,216,255,0.8)] hover:scale-105"
              style={{
                textDecoration: "none",
                textShadow: "0 0 8px rgba(181, 216, 248, 0.6)",
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* footer - 可读又甜系 */}
        <footer
          style={{
            textAlign: "center",
            padding: "18px 0",
            color: "#667",
            fontSize: "15px",
            lineHeight: "1.2",
          }}
        >
          <span
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.6px",
            }}
          >
            Made with&nbsp;
          </span>

          <span
            aria-hidden
            style={{
              fontFamily: "'Pacifico', cursive",
              margin: "0 6px",
              fontSize: "18px",
              textShadow: "0 0 10px rgba(192, 201, 240, 0.25)",
              verticalAlign: "middle",
            }}
          >
            💗
          </span>

          <span
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              letterSpacing: "1px",
              marginLeft: "6px",
            }}
          >
            GYF
          </span>
        </footer>
      </div>
    </div>
  );
}