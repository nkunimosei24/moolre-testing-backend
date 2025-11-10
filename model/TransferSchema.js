import { model, Schema } from "mongoose";


const TransferSchema = new Schema({
    type: {
        type: Number,
        default: 1
    },
    receiver: {
        type: String,
        required: true
    },
    channel: {
        type: Number,
        enum: [2, 1, 6, 7], // 1 - MTN, 2 - Bank, 6 - Vodafone, 7 - AirtelTigo
        required: true
    },
    sublistid: {
        type: String
    },
    currency: {
        type: String,
        required: true,
        enum: ['GHS', 'NGN']
    },
    accountnumber: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Transfer = model('Transfer', TransferSchema)