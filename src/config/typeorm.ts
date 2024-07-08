import { registerAs } from '@nestjs/config';
import { config as dotenvConfig} from 'dotenv';
dotenvConfig({path:'.env'});
// import { category } from 'src/Entities/category.entity';
// import { orderdetail } from 'src/Entities/order-detail.entity';
// import { order } from 'src/Entities/order.entity';
// import { product } from 'src/Entities/product.entity';
// import { users } from 'src/Entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
    type: 'postgres',
    database:process.env.DB_NAME,
    // host:process.env.DB_HOST,
    // host:process.env.DB_NAME,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    // Configuracion extra
    entities:['dist/**/*.entity{.ts,.js}'],
    logging:false,
    synchronize:false,
    dropSchema:false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

