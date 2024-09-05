/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./event.dto";

export class UpdateEventDto extends PartialType(CreateEventDto) {
    price?:number
    stock?: number;
    location?: string;
}
