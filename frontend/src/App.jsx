import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ 导入所有页面组件
import Home from "./pages/Home";
import Story from "./pages/Story";
import Secrets from "./pages/Secrets";
import Music from "./pages/Music";
import Future from "./pages/Future";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/secrets" element={<Secrets />} />
      <Route path="/music" element={<Music />} />
      <Route path="/future" element={<Future />} />
    </Routes>
  );
}