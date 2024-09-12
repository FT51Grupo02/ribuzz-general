/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { format } from "date-fns";

@Injectable()
export class DateFormatService {
    formatDate(date: string | Date): string {
        if (typeof date === 'string') {
            const parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Fecha no válida');
            }
            date = parsedDate;
        }
        return date.toISOString(); // Aquí aseguramos que el return esté dentro del bloque de la función
    }
}
