export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: { message: string }) {
        super(message.message);
        this.status = status;
        this.message = message.message;
    }
}
