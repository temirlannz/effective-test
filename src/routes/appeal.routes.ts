/**
 * @swagger
 * tags:
 *   name: Appeals
 *   description: Управление обращениями
 */

import { Router } from 'express';
import { AppealController } from '../controllers/appeals.controller';
import { validateBody } from '../middleware/validate-body';
import { CreateAppealDto } from '../dtos/create-appeal.dto';
import { CompleteAppealDto } from '../dtos/complete-appeal.dto';
import { CancelAppealDto } from '../dtos/cancel-appeal.dto';
import {InProgressAppealDto} from "../dtos/in-progress-appeal.dto";

const router = Router();

/**
 * @swagger
 * /appeals:
 *   post:
 *     summary: Создать обращение
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppealDto'
 *     responses:
 *       200:
 *         description: Обращение успешно создано
 */
router.post('/', validateBody(CreateAppealDto), AppealController.create);

/**
 * @swagger
 * /appeals/in-progress:
 *   patch:
 *     summary: Отметить обращение "в процессе"
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InProgressDto'
 *     responses:
 *       200:
 *         description: Успешно
 */
router.patch('/in-progress', validateBody(InProgressAppealDto), AppealController.inProgress);

/**
 * @swagger
 * /appeals/complete:
 *   patch:
 *     summary: Завершить обращение
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompleteAppealDto'
 *     responses:
 *       200:
 *         description: Завершено
 */
router.patch('/complete', validateBody(CompleteAppealDto), AppealController.complete);

/**
 * @swagger
 * /appeals/cancel:
 *   patch:
 *     summary: Отменить обращение
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CancelAppealDto'
 *     responses:
 *       200:
 *         description: Отменено
 */
router.patch('/cancel', validateBody(CancelAppealDto), AppealController.cancel);

/**
 * @swagger
 * /appeals:
 *   get:
 *     summary: Получить список обращений
 *     tags: [Appeals]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Конкретная дата для фильтрации обращений (yyyy-MM-dd)
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Начальная дата периода (yyyy-MM-dd)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Конечная дата периода (yyyy-MM-dd)
 *     responses:
 *       200:
 *         description: Список обращений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ListAppealDto'
 */

router.get('/', AppealController.list);

/**
 * @swagger
 * /appeals/cancel-in-progress:
 *   post:
 *     summary: Отменить все обращения в процессе
 *     tags: [Appeals]
 *     responses:
 *       200:
 *         description: Успешно отменены
 */
router.post('/cancel-in-progress', AppealController.cancelAllInProgress);

export default router;
