
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "./base-role.guard";


@Injectable()
export class UserGuard extends AuthGuard {
    protected getExpectedRoles(): string[] {
        return['usuario'];
    }
}
