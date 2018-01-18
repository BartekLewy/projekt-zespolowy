import * as mongoose from "mongoose";
import {IProduct} from "../Interfaces/IProduct";

export interface IProductModel extends IProduct, mongoose.Document {
}

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
});

export let ProductModel = mongoose.model<IProductModel>("Product", productSchema);
