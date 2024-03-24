import { model, Schema } from "mongoose";

const TransactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        // required: true
    },
    desc: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
})

const transactionModel = model('transaction', TransactionSchema);

export { transactionModel };
