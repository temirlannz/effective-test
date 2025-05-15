import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
    constructor(message: { message: string } = { message: 'Не найдено' }) {
        super(404, message);
    }
}
