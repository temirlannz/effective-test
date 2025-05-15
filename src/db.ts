import { DataSource } from "typeorm";
import { Appeal } from "./entities/appeal.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "effective_mobile",
    synchronize: true,
    entities: [Appeal],
});
