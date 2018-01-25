import * as mongoose from "mongoose";

export interface IDiscountCode {
    code: string;
    value: number;
    user: mongoose.Schema.Types.ObjectId;
}