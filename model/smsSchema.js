import { model, Schema } from "mongoose";


const messagesSchema = new Schema ({
    recipient: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required: true
    },
    ref: {
        type: String
    }
})


export const smsSchema = new Schema({
    type: {
        type: Number,
        default: 1
    },
    senderid: {
        type: String,
        default: 'Aseda', //sender id on the app
        required:true
    },
    messages: {
       type: [messagesSchema],
       required: true
    }
    
}, {timestamps: true})

export const SMS = model('SMS', smsSchema)