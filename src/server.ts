import express from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
import errorsHandler from "./middlewares/errors/errorsHandler";
import { rateLimiterHandler } from "./middlewares/rateLimiter/rateLimiterHandler";
import path from "path";
import detect from "detect-port";
import fileUpload from "express-fileupload";

const isDev = process.env.NODE_ENV !== 'production';
const DEFAULT_PORT = parseInt(process.env.DEFAULT_PORT || "3000", 10);
const app = express();

app.use("/files", 
    express.static(path.resolve(__dirname, "..", "tmp"))
)


app.use(rateLimiterHandler);
app.use(express.json())
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024} // no máximo 50MB
}))
app.use(router);

app.use(errorsHandler);

const startServer = (port?: number, defaultPort?: number)=>{
    app.listen(port, ()=>{
        const url = `http://localhost:${port}`;
        console.log(`🚀 Server is running at ${url}`);
        if(defaultPort && port !== DEFAULT_PORT){
            console.warn(`⚠️ Port ${defaultPort} is in use. Switched to ${port}`)
        }
    })
}

app.listen(process.env.DEFAULT_PORT, ()=>{
  console.log("Server running")        
})

// async function startDevelopmentServer() {
//   const port = await detect(DEFAULT_PORT);
//   startServer(port, DEFAULT_PORT);
// }

// function startProductionServer() {
//   const port = parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10);
//   startServer(port);
// }

// if (isDev) {
//   startDevelopmentServer();
// } else {
//   startProductionServer();
// }


