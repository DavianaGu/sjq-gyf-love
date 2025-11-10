import React, { useState, useEffect } from "react";

export default function Secrets() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [albums, setAlbums] = useState([]);
  const [newAlbumName, setNewAlbumName] = useState("");

  // 固定账号密码
  const AUTH = { user: "sjq", pass: "050828" };

  // 初始化读取
  useEffect(() => {
    const saved = localStorage.getItem("secretAlbums");
    if (saved) setAlbums(JSON.parse(saved));
  }, []);

  // 保存到 localStorage（不保存文件，只保存文字信息）
  useEffect(() => {
    const cleanData = albums.map((a) => ({
      ...a,
      media: a.media.map((m) => ({ id: m.id, type: m.type, name: m.name })),
    }));
    localStorage.setItem("secretAlbums", JSON.stringify(cleanData));
  }, [albums]);

  const handleLogin = () => {
    if (username === AUTH.user && password === AUTH.pass) setLoggedIn(true);
    else alert("账号或密码错误！");
  };

  const createAlbum = () => {
    if (!newAlbumName.trim()) return;
    setAlbums([
      ...albums,
      { id: Date.now(), name: newAlbumName.trim(), secrets: [], media: [] },
    ]);
    setNewAlbumName("");
  };

  const deleteAlbum = (id) => {
    if (window.confirm("确定删除这个相册吗？")) {
      setAlbums(albums.filter((a) => a.id !== id));
    }
  };

  const addSecret = (albumId, text) => {
    if (!text.trim()) return;
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? { ...a, secrets: [...a.secrets, { id: Date.now(), text }] }
          : a
      )
    );
  };

  const editSecret = (albumId, secretId, newText) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              secrets: a.secrets.map((s) =>
                s.id === secretId ? { ...s, text: newText } : s
              ),
            }
          : a
      )
    );
  };

  const deleteSecret = (albumId, secretId) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? { ...a, secrets: a.secrets.filter((s) => s.id !== secretId) }
          : a
      )
    );
  };

  const handleMediaUpload = (albumId, e) => {
    const files = Array.from(e.target.files);
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              media: [
                ...a.media,
                ...files.map((file) => ({
                  id: Date.now() + Math.random(),
                  type: file.type,
                  name: file.name,
                  src: URL.createObjectURL(file), // 🔥 临时URL，不卡也不爆localStorage
                })),
              ],
            }
          : a
      )
    );
  };

  const deleteMedia = (albumId, mediaId) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? { ...a, media: a.media.filter((m) => m.id !== mediaId) }
          : a
      )
    );
  };

  // 未登录页面
  if (!loggedIn)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8e1ec] via-[#f9e7f7] to-[#e4d9ff] text-gray-800">
        <div className="backdrop-blur-2xl bg-white/40 px-10 py-12 rounded-3xl shadow-2xl border border-white/30">
          <h1 className="text-5xl font-semibold mb-8 text-pink-600 drop-shadow-md">
            💞 密语时刻
          </h1>
          <input
            type="text"
            placeholder="账号"
            className="mb-4 px-4 py-3 rounded-xl bg-white/60 border border-pink-200 w-72 text-center focus:ring-2 focus:ring-pink-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            className="mb-6 px-4 py-3 rounded-xl bg-white/60 border border-pink-200 w-72 text-center focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold rounded-full shadow-lg transition-all"
          >
            进入密语空间
          </button>
          <a
            href="/"
            className="block mt-8 text-sm text-gray-500 hover:text-pink-600 underline"
          >
            ← 返回主页
          </a>
        </div>
      </div>
    );

  // 登录后页面
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf1f8] via-[#f6e7ff] to-[#e7f0ff] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            💌 密语时刻
          </h1>
          <a
            href="/"
            className="text-lg font-medium text-pink-600 hover:text-purple-600 bg-white/70 px-5 py-2 rounded-full shadow-md transition-all backdrop-blur-md"
          >
            ← 返回主页
          </a>
        </div>

        {/* 创建相册 */}
        <div className="flex items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="输入新相册名称..."
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            className="px-4 py-3 border rounded-xl shadow-sm w-72 focus:ring-2 focus:ring-pink-300 bg-white/60"
          />
          <button
            onClick={createAlbum}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 hover:opacity-90 text-white rounded-xl shadow-md font-medium transition-all"
          >
            ✨ 新建相册
          </button>
        </div>

        {/* 相册展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-gray-700">
                  📔 {album.name}
                </h2>
                <button
                  onClick={() => deleteAlbum(album.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  删除
                </button>
              </div>

              {/* 上传媒体 */}
              <div className="mb-4">
                <label className="cursor-pointer bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full shadow hover:opacity-90 inline-block">
                  上传照片/视频
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleMediaUpload(album.id, e)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 媒体展示 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {album.media.map((m) => (
                  <div
                    key={m.id}
                    className="relative group overflow-hidden rounded-xl"
                  >
                    {m.type.startsWith("video") ? (
                      <video
                        src={m.src}
                        controls
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ) : (
                      <img
                        src={m.src}
                        alt=""
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    )}
                    <button
                      onClick={() => deleteMedia(album.id, m.id)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>

              {/* 秘密区 */}
              <SecretSection
                albumId={album.id}
                secrets={album.secrets}
                addSecret={addSecret}
                editSecret={editSecret}
                deleteSecret={deleteSecret}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecretSection({ albumId, secrets, addSecret, editSecret, deleteSecret }) {
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <div>
      <textarea
        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-pink-300 mb-3 resize-none bg-white/60"
        placeholder="写下你的秘密，只属于你自己..."
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={() => {
          addSecret(albumId, text);
          setText("");
        }}
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white rounded-lg shadow"
      >
        保存秘密
      </button>

      <ul className="mt-4 space-y-3">
        {secrets.map((s) => (
          <li
            key={s.id}
            className="bg-white/70 p-3 rounded-xl shadow-sm flex justify-between items-center"
          >
            {editing === s.id ? (
              <div className="w-full flex flex-col gap-2">
                <textarea
                  className="w-full p-2 border rounded-md bg-white/70"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      editSecret(albumId, s.id, editText);
                      setEditing(null);
                    }}
                    className="text-green-600 font-medium"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="text-gray-500"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="text-gray-700 flex-1">{s.text}</span>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditing(s.id);
                      setEditText(s.text);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteSecret(albumId, s.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
