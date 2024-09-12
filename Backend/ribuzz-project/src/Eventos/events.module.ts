/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Categories } from "../Entidades/categories.entity";
import { EventService } from "./events.service";
import { EventController } from "./events.controller";
import { Events } from "src/Entidades/events.entity";
import { SharedModule } from "src/shared/shared.module";
import { DateFormatModule } from "src/DateFormat/dateformat.module";
  @Module({
    imports:[TypeOrmModule.forFeature([Events, Categories]), DateFormatModule,SharedModule],
    providers: [EventService],
    controllers: [EventController],
  })
  
  export class EventModule{}  