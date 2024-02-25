const LocationService = require("../services/LocationDocumentService");

class LocationDocumentController {
    constructor() {
        this.locationService = new LocationService();
    }

    async create(req, res) {
        const data = await this.locationService.create(req);
        res.status(data.statusCode).json(data);
    }

    async getAll(req, res) {
        const data = await this.locationService.getAll(req);
        res.status(data.statusCode).json(data);
    }

    async getById(req, res) {
        const data = await this.locationService.getById(req);
        res.status(data.statusCode).json(data);
    }

    async updateById(req, res) {
        const data = await this.locationService.updateById(req);
        res.status(data.statusCode).json(data);
    }

    async updateByCategory(req, res) {
        const data = await this.locationService.updateByCategory(req);
        res.status(data.statusCode).json(data);
    }

    async deleteOne(req, res) {
        const data = await this.locationService.deleteOne(req);
        res.status(data.statusCode).json(data);
    }

}

module.exports = LocationDocumentController;
