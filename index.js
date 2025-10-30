import express from "express"
import morgan from "morgan";
import paymentRoutes from "./src/routes/payment.routes.js"
import { port } from "./config.js";



const server = express();

server.use(morgan("dev"))

server.listen(port, () => {

    console.log(`server in port: ${port}`)
})

//inicializamos las rutas
server.use("/api", paymentRoutes)



