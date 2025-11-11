// api/notes.js
export default function handler(req, res) {
  res.status(200).json([
    { id: 1, title: "测试1", content: "你好，这是从后端返回的数据" },
    { id: 2, title: "测试2", content: "如果能看到，说明 API 正常" },
  ]);
}
