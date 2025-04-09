const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정 (Netlify에서 호출 가능하도록)
app.use(cors({
  origin: 'https://animal119.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// JSON 데이터 파일 경로
const filePath = path.join(__dirname, 'places.json');

// ✅ 헬스 체크용 (브라우저에서 API 작동 확인 가능)
app.get('/', (req, res) => {
  res.send('API 서버가 정상 작동 중입니다.');
});

// ✅ 장소 목록 불러오기
app.get('/api/places', (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.json([]); // 파일 없으면 빈 배열
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json(JSON.parse(data || '[]'));
});

// ✅ 장소 등록하기
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

// ✅ 포트는 Vercel에서 무시됨 (로컬 실행용)
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
