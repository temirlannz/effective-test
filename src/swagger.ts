import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appeals API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:9999',
            },
        ],
        components: {
            schemas: {
                CreateAppealDto: {
                    type: 'object',
                    required: ['subject', 'description'],
                    properties: {
                        subject: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 100,
                            example: 'Проблема с оплатой',
                        },
                        description: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 1000,
                            example: 'Я оплатил, но не получил подтверждение.',
                        },
                    },
                },
                CompleteAppealDto: {
                    type: 'object',
                    required: ['responseText', 'id'],
                    properties: {
                        id: {
                            type: 'uuid',
                            example: '2236286a-4a4c-4b12-b6b7-5a14df5391e3',
                        },
                        responseText: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 1000,
                            example: 'Обращение успешно обработано.',
                        },
                    },
                },
                CancelAppealDto: {
                    type: 'object',
                    required: ['cancellationReason', 'id'],
                    properties: {
                        id: {
                            type: 'uuid',
                            example: '2236286a-4a4c-4b12-b6b7-5a14df5391e3',
                        },
                        cancellationReason: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 1000,
                            example: 'Обращение создано по ошибке.',
                        },
                    },
                },
                InProgressDto: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: {
                            type: 'uuid',
                            example: '2236286a-4a4c-4b12-b6b7-5a14df5391e3',
                        },
                    },
                },
                ListAppealDto: {
                    type: 'object',
                    properties: {
                        date: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-01',
                        },
                        from: {
                            type: 'string',
                            format: 'date',
                            example: '2024-11-01',
                        },
                        to: {
                            type: 'string',
                            format: 'date',
                            example: '2024-11-30',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});
