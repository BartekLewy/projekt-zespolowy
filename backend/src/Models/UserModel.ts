import * as mongoose from "mongoose";

import {IUser} from "../Interfaces/IUser";

export interface IUserModel extends IUser, mongoose.Document {}

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    localNumber: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    accountConfirmed: {
        type: Boolean,
        required: true,
        default: false
    },
});

export let UserModel = mongoose.model<IUserModel>("User", userSchema);
