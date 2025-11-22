import express from "express"
import morgan from "morgan";
import paymentRoutes from "./src/routes/payment.routes.js"
import usersRoutes from "./src/routes/users.routes.js"
import { port } from "./config.js";
import { connectM } from "./src/connection/connectDB.js";



const server = express();

server.use(express.json())

server.use(morgan("dev"))

server.listen(port, () => {

    console.log(`server in port: ${port}`)
})

//conection to db
connectM()

//inicializamos las rutas
server.use("/api", paymentRoutes)
server.use("/app", usersRoutes)

//este es un cmabio desde la rama test



