import { model, Schema } from "mongoose";

export const smsSchema = new Schema({
    type: {
        type: Number,
        default: 1
    },
    senderid: {
        type: String,
        default: 'Aseda', //sender id on the app
        required: true
    },
    recipient: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true,
        maxLength: 160
    }

}, { timestamps: true })

export const SMS = model('SMS', smsSchema)