import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from "./routes/authRouters";

const server = express();

dotenv.config();

server.use(
    express.urlencoded({
        extended: true,
    })
);

server.use(express.json())
server.use(cors())

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

server.use(authRouter);

const PORT = process.env.PORT || 5010

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`))