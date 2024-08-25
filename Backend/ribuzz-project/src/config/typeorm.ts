/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
//import { DataSource, DataSourceOptions } from 'typeorm';



dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB, 10),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    //url_int:process.env.DATABASE_INTERNAL_UR,
    //url_ext: process.env.DATABASE_EXTERNAL_EXT,
    entities: [__dirname + 'dist/../Entidades/*.entity.{ts,js}'],
    migrations: [__dirname + 'dist/../Migraciones/*.{ts,.js}'],
    autoLoadEntities:true,
    synchronize: true,
    logging: true,
    dropSchema: false,
    ssl: {
        rejectUnauthorized: false, 
    },
}

export default registerAs('typeorm', () => config);
/*export DATABASE_URL = process.env.DATABASE_EXTERNAL_EXT
export const connectionSource = new DataSource(config as DataSourceOptions);*/

  
