import { Injectable } from "@nestjs/common";
import { BaseRoleGuard } from "./base-role.guard";

@Injectable()
export class EntrepreneurGuard extends BaseRoleGuard {
    protected getExpectedRoles(): string[] {
        return ['emprendedor'];
    }
}
