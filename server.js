const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // 추가

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // 또는 'https://animal119.netlify.app'
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.options('*', cors()); // 👉 preflight 요청 허용 (OPTIONS 메서드 처리)

app.use(express.json());

const filePath = path.join(__dirname, 'places.json');

// ✅ 루트 테스트용 (생략 가능)
app.get('/test', (req, res) => {
  res.send('API 서버가 정상 작동 중입니다.');
});

app.get('/places', (req, res) => {
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
  res.json({ success: true, message: '장소가 저장되었습니다.' });
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
