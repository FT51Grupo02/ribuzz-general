import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Categories } from "../Entidades/categories.entity";
import { EventService } from "./events.service";
import { EventController } from "./events.controller";
import { Events } from "src/Entidades/events.entity";
import { SharedModule } from "src/shared/shared.module";
  @Module({
    imports:[TypeOrmModule.forFeature([Events, Categories]), SharedModule],
    providers: [EventService],
    controllers: [EventController],
  })
  
  export class EventModule{}  