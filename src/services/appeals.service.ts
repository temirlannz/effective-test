import {Appeal} from "../entities/appeal.entity";
import {Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import {AppDataSource} from "../db";
import {AppealStatusEnum} from "../enums/appeal-status.enum";
import {NotFoundException} from "../exceptions/NotFoundException";

export const appealRepository = AppDataSource.getRepository(Appeal);

export class AppealService {
    static async create(subject: string, description: string) {
        console.log(subject, description)
        const appeal = appealRepository.create({ subject, description });
        return await appealRepository.save(appeal);
    }

    static async inProgress(id: string) {
        const appeal = await appealRepository.findOneBy({ id });
        if (!appeal) {
            throw new NotFoundException({ message: 'Обращение не найдено' })
        }

        appeal.status = AppealStatusEnum.IN_PROGRESS;
        return await appealRepository.save(appeal);
    }

    static async complete(id: string, responseText: string) {
        const appeal = await appealRepository.findOneBy({ id });
        if (!appeal) {
            throw new NotFoundException({ message: 'Обращение не найдено' })
        }
        appeal.status = AppealStatusEnum.COMPLETED;
        appeal.response_text = responseText;
        return await appealRepository.save(appeal);
    }

    static async cancel(id: string, cancellationReason: string) {
        const appeal = await appealRepository.findOneBy({ id });
        if (!appeal) {
            throw new NotFoundException({ message: 'Обращение не найдено' })
        }
        appeal.status = AppealStatusEnum.CANCELLED;
        appeal.cancellation_reason = cancellationReason;
        return await appealRepository.save(appeal);
    }

    static async list(date?: string, from?: string, to?: string) {
        const where: FindOptionsWhere<Appeal> = {};

        if (date) {
            const day = new Date(date);
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            where.created_at = Between(day, nextDay);
        } else {
            if (from && to) {
                where.created_at = Between(new Date(from), new Date(to));
            } else if (from) {
                where.created_at = MoreThanOrEqual(new Date(from));
            } else if (to) {
                where.created_at = LessThanOrEqual(new Date(to));
            }
        }

        return appealRepository.find({
            where,
            order: { created_at: 'DESC' },
        });
    }

    static async cancelAllInProgress() {
        const inProgress = await appealRepository.findBy({ status: AppealStatusEnum.IN_PROGRESS });
        for (const appeal of inProgress) {
            appeal.status = AppealStatusEnum.CANCELLED;
            appeal.cancellation_reason = 'Принудительная отмена';
        }
        return appealRepository.save(inProgress);
    }
}
