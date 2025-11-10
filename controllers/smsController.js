import axios from "axios"
import { SMS } from "../model/smsSchema.js"

export const sendSMS = async (req, res) => {

    const { senderid, messages } = req.body

    try {
        const newSMS = await SMS.create(req.body)

        const response = await axios.post('https://api.moolre.com/open/sms/send', {
            type: 1,
            senderid,
            messages
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-VASKEY": process.env.X_API_VASKEY
                }
            }
        )

        return res.status(201).json({
            success: true,
            status: 1,
            message: 'Success',
            data: newSMS,
            moolreResponse: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to send SMS",
            error: error.message
        })

    }
}


export const sendSingleSms = async (req, res) => {
    const { senderid, recipient, message } = req.query

    try {
        const response = await axios.get('https://api.moolre.com/open/sms/send', {
            params: {
                type: 1,
                senderid,
                recipient,
                message,
                "X-API-VASKEY": process.env.X_API_VASKEY
            }
        })
        return res.status(200).json({
            success: true,
            message: "SMS request sent",
            moolreResponse: response.data
        });
    } catch (error) {
        console.error("GET SMS Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to send SMS",
            error: error.message
        });
    }
}