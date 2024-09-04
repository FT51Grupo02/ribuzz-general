import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { GoogleStrategy } from "../strategies/google.strategy";
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import refreshJwtConfig from "./config/refresh-jwt.config";
import googleOauthConfig from "./config/google-oauth.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),

],
    controllers: [AuthController],
    providers: [AuthService, UsuarioService, GoogleStrategy],
  })
  export class AuthModule {}
  