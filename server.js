const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const { createClient: createRedisClient } = require('redis');
const Stripe = require('stripe');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const redisClient = createRedisClient({ url: process.env.REDIS_URL });

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/upload', upload.single('video'), async (req, res) => {
  // هنا كود المونتاج + AI + الرفع لـ Supabase
  res.json({ message: 'تم رفع الفيديو بنجاح. جاري المونتاج...' });
});

app.listen(port, () => {
  console.log(`Cutlist شغال على بورت ${port}`);
});
