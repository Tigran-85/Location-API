const locationModel = require('../models/LocationDocument');
const BaseService = require('./BaseService');

module.exports = class extends BaseService {
    constructor() {
        super();
    }

    async getAll(req) {
        try {
            const { page = 1, page_size = 10, category } = req.query;

            const filter = {};

            if (category) filter.category = category;

            const locations = await locationModel
                .find(filter)
                .skip(page_size * page)
                .limit(page_size)
                .exec();

            // Get the total count of documents
            const totalCount = await locationModel.count();
            // Calculate total pages
            const totalPages = Math.ceil(totalCount / page_size);

            const pagination = {
                total_pages: totalPages,
                current_page: page,
                page_size: locations.length
            };

            return this.response({
                data: {
                    locations,
                    pagination
                },
            });

        } catch(error) {
            console.log(error)
            return this.serverErrorResponse(error)
        }
    }

    async create(req) {
        try {
            const location = await locationModel.create({...req.body});

            return this.response({
                statusCode: 201,
                data: {
                    location_id: location.location_id
                },
                message: "Location created successfully"
            });

        } catch(error) {
            console.log(error)
            return this.serverErrorResponse(error);
        }
    }

    async getById(req) {
        try {
            const { id } = req.params;

            if(id) {
                const location = await locationModel.findById(id);

                if(!location) {
                    return this.response({
                        status: false,
                        statusCode: 400,
                        message: 'Location not found'
                    });
                }

                return this.response({
                    data: {
                        location
                    }
                });
            }

            return this.response({
                status: false,
                statusCode: 400,
                message: 'Location ID is required'
            });
        } catch(error) {
            return this.serverErrorResponse(error);
        }
    }

    async updateById(req) {
        try {
            const { id } = req.params;

            if(!id) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: 'Location ID is required'
                });
            }

            const location = await locationModel.findOneAndUpdate(
                { _id: id },
                { ...req.body }
            );

            if (!location) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: 'Location not found'
                });
            }

            return this.response({
                message: 'Location updated successfully'
            });

        } catch(error) {
            return this.serverErrorResponse(error);
        }
    }

    async updateByCategory(req) {
        try {
            const { category } = req.query;

            const locations = await locationModel.updateMany({ category }, {...req.body });

            if (locations.matchedCount === 0) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: 'Locations not found'
                });
            }

            return this.response({
                message: 'Locations updated successfully',
                data: {
                    updatedCount: locations.matchedCount
                }
            });

        } catch(error) {
            return this.serverErrorResponse(error);
        }
    }

    async deleteOne(req) {
        try {
            const { id } = req.params;

            if (id) {
                const location = await locationModel.findOneAndDelete({ _id: id });

                if (!location) {
                    return this.response({
                        status: false,
                        statusCode: 400,
                        message: 'Location not found'
                    });
                }

                return this.response({
                    message: "Location deleted successfully"
                });
            }

            return this.response({
                status: false,
                statusCode: 400,
                message: 'Location ID is required'
            });
        } catch (error) {
            console.log(error)
            return this.serverErrorResponse(error);
        }
    }
};
