import express, { Application } from "express";
import getIcon from "./icons";
import { redisCache } from "./redis";
import cors from "cors";

import path from "path";

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());

app.get("/icons/:url", redisCache, getIcon);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
