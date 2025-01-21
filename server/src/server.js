import express from 'express';
import dotenv from 'dotenv';
import connectDb from './lib/db.js';
dotenv.config();


const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port $(port)`);
  connectDb();
})