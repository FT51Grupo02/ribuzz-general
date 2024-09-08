import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleValidatorService } from 'src/Guardianes/role-validator.service';
import { AdminGuard } from 'src/Guardianes/admin.guard';
import { ClientGuard } from 'src/Guardianes/client.guard';
import { EntrepreneurGuard } from 'src/Guardianes/entrepreneur.guard';

@Module({
    providers: [
        RoleValidatorService,
        AdminGuard,
        ClientGuard,
        EntrepreneurGuard,
        JwtService,
    ],
    exports: [
        RoleValidatorService,
        AdminGuard,
        ClientGuard,
        EntrepreneurGuard,
    ],
})
export class SharedModule {}
