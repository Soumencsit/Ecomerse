import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './route/productRoute.js';
import userRoute from './route/userRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); 
app.use(cors());

//
app.use("/api/product",productRouter)
app.use("/api/user",userRoute)




connectDB()
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
// Starting the server
app.listen(PORT, () => {
    console.log(`App Running Successfully on PORT ${PORT}`);
});
