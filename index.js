import express from "express"
import morgan from "morgan";
import { config } from "dotenv";
import paymentRoutes from "./src/routes/payment.routes.js"

config()

const server = express();

server.use(morgan("dev"))

const port = process.env.PORT;

server.listen(port, () => {

    console.log(`server in port: ${port}`)
})

//inicializamos las rutas
server.use("/api", paymentRoutes)

