import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import {CancelAppealDto} from "../dtos/cancel-appeal.dto";
import {CompleteAppealDto} from "../dtos/complete-appeal.dto";
import {CreateAppealDto} from "../dtos/create-appeal.dto";
import {ListAppealDto} from "../dtos/list-appeal.dto";
import {InProgressAppealDto} from "../dtos/in-progress-appeal.dto";

type DtoClass = new () => CancelAppealDto | CompleteAppealDto | CreateAppealDto | ListAppealDto | InProgressAppealDto;

export function validateBody(dtoClass: DtoClass) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Ошибка валидации',
                errors: errors.map(e => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
        }

        req.body = dtoObject;
        next();
    };
}
