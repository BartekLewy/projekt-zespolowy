import * as bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";

import {Request, Response} from "express";
import {validate} from "class-validator";
import {isNullOrUndefined} from "util";

import {User} from "../Entities/User";
import {IUserModel} from "../Models/UserModel";

import {Scopes, UserType} from "../Commons/Enums";

import Utils = require("../Commons/Utils");
import {Verify} from "crypto";
import {TokenManager} from "../Services/TokenManager";

export class AuthenticationController {

    static Login (req: Request, res: Response) {
        const username = req.body.username;
        const password = req.body.password;

        if (isNullOrUndefined(username) || isNullOrUndefined(password)) {
            return res.status(401).json();
        }

        User.factory.findOne({'username': username},
            function (err: any, user: User) {
                if (err) {
                    return res.status(400).json(err);
                }

                bcrypt.compare(password, user.password, function (err: Error, same: boolean) {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (same) {
                        if (user.accountConfirmed) {
                            return res.status(200).json(TokenManager.generateAccessToken(user));
                        }
                        else {
                            return res.status(403).json("Unconfirmed");
                        }
                    }
                    else {
                        return res.status(401).json();
                    }
                });
                return;
            });
    }

    static Register(req: Request, res: Response, user: User) {
        validate(user).then(errors => {
            if (errors.length > 0) {
                return res.status(400).json(errors);
            } else {
                bcrypt.hash(user.password, 12, function (err, hash) {
                    if (err != null) {
                        return res.status(400).json(err);
                    }

                    user.password = hash;
                    user.persist((err: any, product: IUserModel) => {
                        if (err != null) {
                            if (err.code == 11000) {
                                let field = Utils.retrieveDuplicateFieldFromMongoError(err);

                                let responseContent = {
                                    problem: "duplicated",
                                    field: field,
                                };
                                return res.status(400).json(responseContent);
                            }
                            return res.status(400).json(err);
                        }

                        console.log(".");
                        return res.status(200).json(null);
                    });

                });
            }
        });
    }

    static AddUser (req: Request, res: Response) {
        return AuthenticationController.Register(req, res, new User(req.body));

    }

    static AddOperator (req: Request, res: Response) {
        let user = new User(req.body);
        user.type = UserType.Operator;

        return AuthenticationController.Register(req, res, user);
    }


    //
    // static ConfirmAccount(req: Request, res: Response) {
    //     if (isNullOrUndefined(req.params.token)) {
    //         log.error("Nie można potwierdzić użytkownika - brak tokena");
    //         return ResponseManager.genericBadRequest(res, null, "no_token");
    //     }
    //
    //     Jwt.verify(req.params.token, config.secret, (err: any, decoded: any) => {
    //         if (err) {
    //             if (err.name === 'TokenExpiredError') {
    //                 log.warn({data: {errors: err}}, "Nie można potwierdzić konta - token przedawniony");
    //                 return ResponseManager.genericForbidden(res, null, 'token_expired');
    //             }
    //             log.warn({data: {errors: err}}, "Błąd przy weryfikacji tokena");
    //             return ResponseManager.genericBadRequest(res, null, "bad_token");
    //         }
    //
    //         if (decoded.scope.length != 1 || decoded.scope[0] !== Scopes.ACCOUNT_CONFIRMATION) {
    //             log.warn({data:{decoded_token: decoded}}, "Nie można potwierdzić konta - niepoprawny scope");
    //             return ResponseManager.genericBadRequest(res, null, "bad_scope");
    //         }
    //
    //         log.trace("Token ok, potwierdzam konto: " + decoded.username);
    //
    //         User.factory.findOne({'username': decoded.username}, (err: any, user: User) => {
    //             if (err) {
    //                 log.error({data: {errors: err}}, "Błąd przy pobieraniu użytkownika z bazy");
    //                 return ResponseManager.genericBadRequest(res, null,"db_error");
    //             }
    //
    //             if (user == null) {
    //                 log.error({data: {decoded_token: decoded}}, "Nie można potwierdzić konta - użytkownik w tokenie nie ustnieje");
    //                 return ResponseManager.genericUnauthorized(res, null,"user_not_found");
    //             }
    //
    //             if (user.accountConfirmed) {
    //                 log.warn({data:{decoded_token: decoded}}, "Konto zostało już potwierdzone");
    //                 return ResponseManager.genericForbidden(res, null, 'already_confirmed');
    //             }
    //
    //             user.accountConfirmed = true;
    //             user.persist((err: any) => {
    //                 if (err) {
    //                     log.error({data:{errors: err}}, "Nie udało się zapisać użytkownika do bazy");
    //                     return ResponseManager.genericBadRequest(res, null, "db_error");
    //                 }
    //
    //                 log.info("Konto zostało potwierdzone");
    //                 return ResponseManager.genericOK(res);
    //             });
    //         });
    //     });
    // }
    //
    // static SetAdditionalUserData(req: Request, res: Response) {
    //     if (!req.tokenData) {
    //         log.error({data: {path: req.path}}, "Nie podano tokena, błąd autoryzacji");
    //         return ResponseManager.genericUnauthorized(res);
    //     }
    //
    //     if (req.tokenData.scope.indexOf(Scopes.PROVIDE_ADDITIONAL_USER_DATA) === -1) {
    //         log.warn({data: {decoded_token:req.tokenData}}, "Nie można przypisać danych - zły scope");
    //         return ResponseManager.genericForbidden(res);
    //     }
    //
    //     User.factory.findOne({username: req.tokenData.username}, (err, user) => {
    //         if (err) {
    //             log.error({data:{errors: err}}, "Błąd przy pobieraniu użytkownika");
    //             return ResponseManager.genericBadRequest(res, null, 'db_error');
    //         }
    //
    //         if (user === null) {
    //             log.error({data:{decoded_token: req.tokenData}}, "Podany użytkownik nie istnieje");
    //             return ResponseManager.genericUnauthorized(res, null, 'user_not_found');
    //         }
    //
    //         if (user.userDataProvided) {
    //             log.warn({data: {decoded_token:req.tokenData}}, "Użytkownik ma już przypisane dane");
    //             return ResponseManager.genericForbidden(res, null, 'already_provided');
    //         }
    //
    //         if (!user.accountConfirmed) {
    //             log.warn({data:{decoded_token:req.tokenData}}, "Nie można przypisać danych niepotwierdzonemu użytkownikowi");
    //             return ResponseManager.genericForbidden(res, null);
    //         }
    //
    //         user.userDataProvided = true;
    //         user.userInfo = req.body.userInfo;
    //
    //         user.persist((err:any, usr:any) => {
    //             if (err) {
    //                 console.log(err);
    //                 return ResponseManager.genericBadRequest(res);
    //             }
    //             return ResponseManager.successfullySetUserData(res, user);
    //         });
    //     });
    // }
    //
    // static GetUserData(req: Request, res: Response) {
    //     if (!req.tokenData) {
    //         log.error({data: {path: req.path}}, "Nie podano tokena, błąd autoryzacji");
    //         return ResponseManager.genericUnauthorized(res);
    //     }
    //
    //     let isAllowed = false;
    //
    //     for(let scope of req.tokenData.scope) {
    //         if (!isNullOrUndefined(UserType[scope])) {
    //             isAllowed = true;
    //             break;
    //         }
    //     }
    //
    //     if (!isAllowed) {
    //         return ResponseManager.genericForbidden(res);
    //     }
    //
    //     User.factory.findOne({username: req.tokenData.username}, (err, user) => {
    //         if (err) {
    //             log.error({data:{errors: err}}, "Błąd przy pobieraniu użytkownika z bazy");
    //             return ResponseManager.genericBadRequest(res);
    //         }
    //
    //         if (isNullOrUndefined(user)) {
    //             log.warn({data: {decoded_token: req.tokenData}}, "Nie znaleziono użytkownika");
    //             return ResponseManager.genericBadRequest(res);
    //         }
    //
    //         let userJson = JSON.parse(JSON.stringify(user, (key: string, value: string) => {
    //             if (key === 'password') return undefined;
    //             if (key === '_id') return undefined;
    //             if (key === '__v') return undefined;
    //             if (key === 'userDataProvided') return undefined;
    //             if (key === 'accountConfirmed') return undefined;
    //             else return value;
    //         }, " "));
    //
    //         return ResponseManager.genericOK(res, null, userJson);
    //     });
    // }
    //
    // static ChangeUserData(req: Request, res: Response) {
    //
    //     if (!req.tokenData) {
    //         log.error({data: {path: req.path}}, "Błąd - nie podano tokena!");
    //         return ResponseManager.genericUnauthorized(res);
    //     }
    //
    //     let isAllowed = false;
    //
    //     for(let scope of req.tokenData.scope) {
    //         if (!isNullOrUndefined(UserType[scope])) {
    //             isAllowed = true;
    //             break;
    //         }
    //     }
    //
    //     if (!isAllowed) {
    //         log.warn({data: {decoded_token: req.tokenData}}, "Nieprawidłowy scope użytkownika");
    //         return ResponseManager.genericForbidden(res);
    //     }
    //
    //     User.factory.findOne({username: req.tokenData.username}, (err: any, user: User) => {
    //         if (err) {
    //             log.error({data: {errors: err}}, "Błąd w czasie pobierania użytkownika z bazy danych");
    //             return ResponseManager.genericBadRequest(res);
    //         }
    //
    //         if(isNullOrUndefined(user)) {
    //             log.warn({data: {decoded_token: req.tokenData}}, "Podany użytkownik nie istnieje!");
    //             return ResponseManager.genericBadRequest(res);
    //         }
    //
    //         if (isNullOrUndefined(req.body.userInfo)) {
    //             log.warn({data: {path: req.path}}, "Błąd - nie podano danych w ciele zapytania");
    //             return ResponseManager.genericBadRequest(res);
    //         }
    //         user.userInfo = req.body.userInfo;
    //
    //         user.persist((err, product) => {
    //             if (err) {
    //               log.error({data:{errors:err}},"coś nie tak");
    //               return ResponseManager.genericBadRequest(res);
    //             }
    //             return ResponseManager.genericOK(res);
    //         });
    //     });
    // }
}