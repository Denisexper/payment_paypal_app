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
                landing_page: "NO_PREFERENCE",
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
                
            }
        })

        return res.json(response.data)
        


    }

    async captureOrder (req, res) {

        const { token } = req.query;

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET
                }
            })

        console.log(response.data)

        return res.send('payed')
    }

    async cancelPayment (req, res) {

        res.send("cancel pay")
    }
}