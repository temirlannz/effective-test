import express from 'express';
import { Request, Response, NextFunction } from "express";
import appealRoutes from "./routes/appeal.routes";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./swagger";

export const app = express();

app.use(express.json());
app.use("/appeals", appealRoutes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err.status && err.message) {
        res.status(err.status).json({ message: err.message, status: err.status });
    } else {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});



