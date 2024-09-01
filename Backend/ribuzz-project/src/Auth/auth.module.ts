import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { GoogleStrategy } from "./google.strategy";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: 'google' }), 
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'default_secret', 
        signOptions: { expiresIn: '60m' },
    }),
],
    controllers: [AuthController],
    providers: [AuthService, UsuarioService, GoogleStrategy],
  })
  export class AuthModule {}
  