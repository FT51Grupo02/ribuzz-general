import { Injectable } from "@nestjs/common";
import { BaseRoleGuard } from "./base-role.guard";

@Injectable()
export class ClientGuard extends BaseRoleGuard {
    protected getExpectedRoles(): string[] {
        return ['cliente'];
    }
}
