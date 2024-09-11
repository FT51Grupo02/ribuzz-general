/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "./base-role.guard";

@Injectable()
export class ClientGuard extends AuthGuard {
    protected getExpectedRoles(): string[] {
        return ['cliente'];
    }
}
