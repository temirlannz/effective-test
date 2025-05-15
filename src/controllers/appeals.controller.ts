import { Request, Response } from "express";
import {AppealService} from "../services/appeals.service";
import {CreateAppealDto} from "../dtos/create-appeal.dto";

export class AppealController {
    static async create(req: Request, res: Response) {
        const { subject, description } = req.body;
        const appeal = await AppealService.create(subject, description);
        res.json(appeal);
    }

    static async inProgress(req: Request, res: Response) {
        const appeal = await AppealService.inProgress(req.body.id);
        res.json(appeal);
    }

    static async complete(req: Request, res: Response) {
        const appeal = await AppealService.complete(req.body.id, req.body.responseText);
        res.json(appeal);
    }

    static async cancel(req: Request, res: Response) {
        const appeal = await AppealService.cancel(req.body.id, req.body.cancellationReason);
        res.json(appeal);
    }

    static async list(req: Request, res: Response) {
        const { date, from, to } = req.query;
        const appeals = await AppealService.list(
            date as string,
            from as string,
            to as string
        );
        res.json(appeals);
    }

    static async cancelAllInProgress(_: Request, res: Response) {
        const appeals = await AppealService.cancelAllInProgress();
        res.json(appeals);
    }
}
