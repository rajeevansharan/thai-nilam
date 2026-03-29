import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import issueRoutes from './routes/issueRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (Uploaded PDFs and Images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/issues', issueRoutes);
app.use('/api/users', userRoutes);

// Basic route for health check
app.get('/', (req, res) => {
  res.send('ThaiNilam Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
