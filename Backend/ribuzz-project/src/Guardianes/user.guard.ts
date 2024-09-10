/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { BaseRoleGuard } from "./base-role.guard";

@Injectable()
export class UserGuard extends BaseRoleGuard {
    protected getExpectedRoles(): string[] {
        return ['usuario'];
    }
}
