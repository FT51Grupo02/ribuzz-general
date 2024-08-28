import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Categories } from "../Entidades/categories.entity";
import { EventService } from "./events.service";
import { EventController } from "./events.controller";
import { Events } from "src/Entidades/events.entity";
  @Module({
    imports:[TypeOrmModule.forFeature([Events, Categories])],
    providers: [EventService],
    controllers: [EventController],
  })
  
  export class EventModule{}  