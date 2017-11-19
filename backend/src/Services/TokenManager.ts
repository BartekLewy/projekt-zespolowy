import * as Jwt from "jsonwebtoken";

import {User} from "../Entities/User";
import {Scopes, UserType} from "../Commons/Enums";

export class TokenManager {

    static generateAccessToken(user: User) {
        let scope: Scopes;
        if (user.type == UserType.Customer) {
            scope = Scopes.CustomerScope;
        }
        else if(user.type == UserType.Operator) {
            scope = Scopes.OperatorScope;
        }

        let tokenData = {
            username: user.username,
            scope: scope,
        };

        return Jwt.sign(tokenData, 'projekt-zespołowy', {
            expiresIn: "24h"
        });
    }


    static generateConfirmationToken(user: User) {
        let tokenData = {
            username: user.username,
            scope: [Scopes.AccountConfirmation],
        };

        return Jwt.sign(tokenData, 'projekt-zespołowy', {
            expiresIn: "24h"
        });
    }
}