import express from 'express';
import dotenv from 'dotenv';
import connectDb from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();


const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());  // Untuk JSON payload
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));  // Untuk form data
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
})