import express from "express";
import userRoute from "./routes/user.js";

import { SERVER_PORT } from "../.moon.config.mjs";

const app = express();

app.use("/user", userRoute);

app.listen(SERVER_PORT, (error) => {
    if(error) console.log(error);
    console.log(`Server is running on PORT: ${SERVER_PORT}`);
})