const express = require('express');
const cors = require('cors');

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

// ✅ 임시 메모리 저장소 (재시작하면 초기화됨)
let places = [];

// ✅ 루트 확인용
app.get('/', (req, res) => {
  res.send('API 정상 작동 중!');
});

// ✅ 장소 조회
app.get('/api/places', (req, res) => {
  res.json(places);
});

// ✅ 장소 등록
app.post('/api/places', (req, res) => {
  const newPlace = req.body;
  places.push(newPlace);
  res.json({ success: true, message: '✅ 장소가 등록되었습니다!' });
});

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
