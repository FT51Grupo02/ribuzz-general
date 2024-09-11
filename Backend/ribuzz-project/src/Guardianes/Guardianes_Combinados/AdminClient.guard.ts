
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "../base-role.guard";


@Injectable()
export class AdminClientGuard extends AuthGuard {
    protected getExpectedRoles(): string[] {
        return['admin', 'cliente'];
    }
}
