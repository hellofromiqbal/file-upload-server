import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  return res.json({ message: 'Welcome!' });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('App is connected to MongoDB database.');
    app.listen(PORT, () => {
      console.log(`App is listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });