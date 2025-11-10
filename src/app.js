import express from "express";
import 'dotenv/config';
import cors from "cors"

import aiRoutes from "./routes/ai.routes.js";

const app = express(); // creates server does not start it.

app.use(express.json());

// app.options("*", cors({
//   origin: "",
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   maxAge: 86400
// }));


app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});




app.use("/api/v1/ai",aiRoutes);

app.get("/fine",(req,res)=>{
    res.send({
        pass: "test pass"
    })
})
// app.use("api/v1/user/",aiRoutes);

export default app;