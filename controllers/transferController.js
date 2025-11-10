import axios from "axios"
import { Transfer } from "../model/TransferSchema.js"


export const validateAcount = async (req, res, next) => {

    const { type, receiver, channel, sublistid, currency, accountnumber } = req.body

    if (!receiver) {
        return res.status(400).json('Please enter account number of the recipient')
    }
    if (!channel) {
        return res.status(400).json('Please select a payment method')
    }
    if (!currency) {
        return res.status(400).json('Please select a currency')
    }
    if (!accountnumber) {
        return res.status(400).json('Please enter your account number')
    }

    try {
        const response = await axios.post('https://api.moolre.com/open/transact/validate', {
            type: 1,
            receiver,
            channel,
            sublistid: sublistid || "",
            currency,
            accountnumber
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-USER": process.env.X_API_USER,
                    "X-API-KEY": process.env.X_API_KEY
                }
            }
        )

        const { status, message, data, code } = response.data

        if (status === 1) {
            return res.status(200).json({
                success: true,
                accountName: data,
                message: "Account validated successfully"
            })
        } else {
            res.status(400).json({
                success: false,
                message: message || 'Account not found'
            })
        }
    } catch (error) {
        console.error("Validation error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

//save tranfer wfter we validate
export const createTransfer = async (req, res) => {
    const { type, receiver, channel, sublistid, currency, accountnumber, accountName } = req.body
    try {
        const transfer = new Transfer({
            receiver,
            channel,
            sublistid: sublistid || '',
            currency,
            accountnumber,
            accountName
        })

        transfer.save()

        return res.status(201).json({
            success: true,
            message: "Transfer record created successfully",
            data: transfer
        })
    } catch (error) {
        console.error("Save transfer error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to create transfer record",
            error: error.message
        });
    }
}