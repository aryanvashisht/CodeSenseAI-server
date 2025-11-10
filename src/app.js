import express from "express";
import 'dotenv/config';
import cors from "cors"

import aiRoutes from "./routes/ai.routes.js";

const app = express(); // creates server does not start it.

app.use(express.json());

app.use(cors({
  origin: ' http://localhost:5173/', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));

app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/v1/ai",aiRoutes);

app.get("/fine",(req,res)=>{
    res.send({
        pass: "test pass"
    })
})
// app.use("api/v1/user/",aiRoutes);

export default app;