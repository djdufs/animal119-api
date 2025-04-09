const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS 설정
app.use(cors({
  origin: 'https://animal119.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

app.use(express.json());

const filePath = path.join(__dirname, 'places.json');

// ✅ 루트 확인용
app.get('/', (req, res) => {
  res.send('API 정상 작동 중!');
});

app.get('/api/places', (req, res) => {
  if (!fs.existsSync(filePath)) return res.json([]);
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json(JSON.parse(data || '[]'));
});

app.post('/api/places', (req, res) => {
  const newPlace = req.body;
  let places = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    places = JSON.parse(raw || '[]');
  }

  places.push(newPlace);
  fs.writeFileSync(filePath, JSON.stringify(places, null, 2));
  res.json({ success: true, message: '✅ 장소가 등록되었습니다!' });
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
