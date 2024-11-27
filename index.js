import express from 'express';
import cors from 'cors';
import connect from './config/index.js';
const db = connect();
const app = express();
app.use(cors());
app.use(express.json());

import seedDatabase from './seed.js';
// seedDatabase();

import { setupRoutes } from './routes/index.js';
setupRoutes(app);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})


