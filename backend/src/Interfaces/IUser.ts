import {UserType} from "../Commons/Enums";

export interface IUser {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    street: string;
    localNumber: string;
    postalCode: string;
    city: string;
    country: string;
    type: UserType;
    accountConfirmed: boolean;
}

