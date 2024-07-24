import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 4444;
env.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const corsOptions = {
    origin: `http://localhost:${process.env.REACT_PORT}`,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
});

db.connect();

app.use("/", router(db));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

