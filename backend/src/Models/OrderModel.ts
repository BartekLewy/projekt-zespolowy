import * as mongoose from "mongoose";
import {IOrder} from "../Interfaces/IOrder";

export interface IOrderModel extends IOrder, mongoose.Document {}

let orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    street: {
        type: String,
        required: true,
        unique: false,
    },
    localNumber: {
        type: String,
        required: true,
        unique: false,
    },
    city: {
        type: String,
        required: true,
        unique: false,
    },
    postalCode: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    phone: {
        type: String,
        required: true,
        unique: false,
    },
    discountCode: {
        type: String,
        required: false,
        unique: false,
    },
    discountValue: {
        type: String,
        required: false,
        unique: false,
    },
    orderValue: {
        type: Number,
        required: false,
        unique: false,
    },

    orderStatus: {
        type: String,
        required: false,
        unique: false,
    },

    products: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            unique: false,
        },
        count: {
            type: Number,
            required: true,
            default: 1,
            unique: false,
        }
    }]
});

export let OrderModel = mongoose.model<IOrderModel>('Order', orderSchema);