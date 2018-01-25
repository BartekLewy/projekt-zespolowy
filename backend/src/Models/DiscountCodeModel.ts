import {IDiscountCode} from "../Interfaces/IDiscountCode";
import * as mongoose from "mongoose";

export interface IDiscountCodeModel extends IDiscountCode, mongoose.Document {}

let discountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        reuqired: true,
        unique: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        unique: false,
    }
});

export let DiscountCodeModel = mongoose.model<IDiscountCodeModel>('DiscountCode', discountCodeSchema);