import { usersModel } from "../models/users.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class usersController {

    async getUsers (req, res) {
        try {
            
            const users = await usersModel.find()

            //validamos el array que retorna ya que users siempre retornara un array aunque este vacio
            if(users.length === 0) {
                return res.status(404).json({
                    msj: "users not found"
                })
            }

            res.status(200).json({
                msj: "users getters",
                data: users
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async login (req, res) {

        const { email, password } = req.body;

        try {
            
            const response = await usersModel.findOne({ email})

            if(!response){
                return res.status(404).json({
                    msj: "user not found"
                })
            }

            if (user.password !== password) {
            return res.status(401).json({
                msj: "invalid password"
            });
            }

            const token = jwt.sign(
                {user: user._id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES}
            )

            res.status(200).json({
                msj: "welcome in",
                data: response,
                token
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async register (req, res) {

        const { name, email, password } = req.body;

        try {
            
            const hasPass = bcrypt.hash(password, 10)

            const response = await usersModel.create({name, email, hasPass})

            //crear un token a la hora de hacer register
            const token = jwt.sign(
                {id: user._id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES}
            )

            res.status(200).json({
                msj: "user created",
                data: response,
                token
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }
}