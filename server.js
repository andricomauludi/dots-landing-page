const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const db = new sqlite3.Database("./database.db");

// Initialize table
db.run(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);

// Get all posts
app.get("/api/posts", (req, res) => {
  db.all(
    "SELECT id, title, content, timestamp FROM posts ORDER BY id DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get one post
app.get("/api/posts/:id", (req, res) => {
  db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, row) => {
    res.json(row);
  });
});

// Create post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  
    db.run(
      "INSERT INTO posts (title, content, timestamp) VALUES (?, ?, ?)",
      [title, content, timestamp],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  });
  

//delete post
app.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Deleted" });
  });
});

//edit article
app.put("/api/posts/:id", (req, res) => {
  const { title, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Unauthorized" });
  
        // Login sukses
        res.json({ username: user.username });
      }
    );
  });
  

// Upload image (for Quill if needed)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});
app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
