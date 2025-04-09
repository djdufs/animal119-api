const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Supabase 연결 설정
const supabaseUrl = 'https://eabeahokdzxikznajhym.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhYmVhaG9rZHp4aWt6bmFqaHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDIwNjksImV4cCI6MjA1OTc3ODA2OX0.ovBahnITIdMmCf89UyKKonLYlLpK1rlrc9fRIM18izw';
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ 미들웨어
app.use(cors({
  origin: 'https://animal119.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ✅ 기본 확인용 라우터
app.get('/', (req, res) => {
  res.send('✅ Supabase API 서버 작동 중!');
});

// ✅ 장소 목록 가져오기
app.get('/api/places', async (req, res) => {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ 장소 등록
app.post('/api/places', async (req, res) => {
  const { name, desc, lat, lng } = req.body;

  const { data, error } = await supabase
    .from('places')
    .insert([{ name, desc, lat, lng }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, message: '✅ 장소가 Supabase에 저장되었습니다.', data });
});

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
