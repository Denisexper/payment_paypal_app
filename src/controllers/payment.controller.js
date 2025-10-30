import axios from "axios"
import { PAYPAL_API } from "../../config"

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
        axios.post(`${PAYPAL_API}/v2/checkout/orders`, order)

    }

    async captureOrder (req, res) {

        res.send("process pay")
    }

    async cancelPayment (req, res) {

        res.send("cancel pay")
    }
}