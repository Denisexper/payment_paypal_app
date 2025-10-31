import axios from "axios"
import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../../config.js"

export class paymentController {

    

    async createOrder (req, res) {

        const order = {

            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00"
                    }
                },
            ],

            application_context: {
                brand_name: "Mi tienda",
                landing_page: "NO PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `http://localhost:3000/api/capture-order`,
                cancel_url: `http://localhost:3000/api/cancel-order`
            }
        }

        //parametros para generar el token
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const {data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {

            auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET
                }
        })

        console.log(access_token)

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log(response)

        return res.json("capture order")
        


    }

    async captureOrder (req, res) {

        res.send("process pay")
    }

    async cancelPayment (req, res) {

        res.send("cancel pay")
    }
}