import * as mongoose from "mongoose";

export interface IOrder {
    firstName: string;
    lastName: string;
    street: string;
    localNumber: string;
    city: string;
    postalCode: string;
    email: string;
    phone: string;
    products: {
        item: mongoose.Schema.Types.ObjectId;
        count: number;
    }[];
    discountCode: string;
    discountValue: number;
    orderValue: number;
    orderStatus: string;
}
