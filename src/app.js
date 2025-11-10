import express from "express";
import 'dotenv/config';
import cors from "cors"

import aiRoutes from "./routes/ai.routes.js";

const app = express(); // creates server does not start it.

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173"
    //   ""       // frontend domain
];

app.use(express.json());

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use("/api/v1/ai", aiRoutes);

app.get("/fine", (req, res) => {
    res.send({
        pass: "test pass"
    })
})
// app.use("api/v1/user/",aiRoutes);

export default app;