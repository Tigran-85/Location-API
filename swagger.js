const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Location API Documentation',
        description: 'This document outlines the endpoints and methods available for interacting with the Location API.',
        version: '1.0.0',
    },
    servers: [
        {
            url: '/api',
        },
    ],
    tags: [
        {
            name: 'Location Document API'
        },
        {
            name: 'User Authentication'
        },
    ],
    paths: {
        '/locations': {
            post: {
                tags: ['Location Document API'],
                summary: 'Creating a Location Document',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LocationInput',
                            },
                            example: {
                                "name": "New York",
                                "description": "Nice city",
                                "category": "USA",
                                "rating": 5,
                                "review_count": 50,
                                "latitude": "40.177200",
                                "longitude": "44.503490"
                            }
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
            get: {
                tags: ['Location Document API'],
                summary: 'Paginated Retrieval of All Documents',
                parameters: [
                    {
                        in: 'query',
                        name: 'page',
                        schema: {
                            type: 'integer',
                            default: 1,
                        },
                        description: 'Page number for pagination.',
                    },
                    {
                        in: 'query',
                        name: 'page_size',
                        schema: {
                            type: 'integer',
                            default: 10,
                        },
                        description: 'Number of locations per page.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
            patch: {
                tags: ['Location Document API'],
                security: [{
                    bearerAuth: []
                }],
                summary: 'Updating Location Documents by Their Category',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LocationInput',
                            },
                            example: {
                                "name": "New York",
                                "description": "Nice city",
                                "category": "USA",
                                "rating": 5,
                                "review_count": 50,
                                "latitude": "40.177200",
                                "longitude": "44.503490"
                            }
                        },
                    },
                },
                parameters: [
                    {
                        in: 'query',
                        name: 'category',
                        schema: {
                            type: 'string',
                        },
                        description: 'The category of locations to be updated.',
                    },
                    {
                        in: 'header',
                        name: 'Authorization',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'Bearer {token}',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/locations/{location_id}': {
            get: {
                tags: ['Location Document API'],
                summary: 'Retrieval of a Specific Location Document by ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'location_id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the location.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
            patch: {
                tags: ['Location Document API'],
                security: [{
                    bearerAuth: []
                }],
                summary: 'Updating a Location Document by Its ID',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LocationInput',
                            },
                            example: {
                                "name": "New York",
                                "description": "Nice city",
                                "category": "USA",
                                "rating": 5,
                                "review_count": 50,
                                "latitude": "40.177200",
                                "longitude": "44.503490"
                            }
                        },
                    },
                },
                parameters: [
                    {
                        in: 'path',
                        name: 'location_id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the location.',
                    },
                    {
                        in: 'header',
                        name: 'Authorization',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'Bearer {token}',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
            delete: {
                tags: ['Location Document API'],
                security: [{
                    bearerAuth: []
                }],
                summary: 'Deleting a Location Document by Its ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'location_id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the location.',
                    },
                    {
                        in: 'header',
                        name: 'Authorization',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'Bearer {token}',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/auth/sign-up': {
            post: {
                tags: ['User Authentication'],
                summary: 'Registration',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RegistrationInput',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/auth/sign-in': {
            post: {
                tags: ['User Authentication'],
                summary: 'Login',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LoginInput',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            LocationInput: {
                type: 'object',
                properties: {
                    // Define your properties here
                },
                // Add required properties if needed
            },
            RegistrationInput: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        minLength: 3,
                    },
                    lastName: {
                        type: 'string',
                        minLength: 3,
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                    },
                    password: {
                        type: 'string',
                        pattern: '^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*[0-9]{2,})(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                    },
                },
            },
            LoginInput: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                    },
                    password: {
                        type: 'string',
                        minLength: 5,
                    },
                },
            },
        },
    },
};

module.exports = swaggerDocument;
