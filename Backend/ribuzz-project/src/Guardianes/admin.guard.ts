import { Injectable } from "@nestjs/common";
import { BaseRoleGuard } from "./base-role.guard";

@Injectable()
export class AdminGuard extends BaseRoleGuard {
    protected getExpectedRoles(): string[] {
        return ['admin'];
    }
}
