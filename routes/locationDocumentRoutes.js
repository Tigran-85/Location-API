const LocationController = require("../controllers/LocationDocumentController");
const { requireAuth } = require("../middlwares/AuthMiddlware");
const { Router } = require("express");

const locationController = new LocationController();
const router = Router();

router.get(
    "/",
    locationController.getAll.bind(locationController)
);

router.post(
    "/",
    locationController.create.bind(locationController)
);

router.get("/:id",
    locationController.getById.bind(locationController)
);

router.patch("/:id",
    requireAuth,
    locationController.updateById.bind(locationController)
);

router.patch("/",
    requireAuth,
    locationController.updateByCategory.bind(locationController)
);

router.delete(
    "/:id",
    requireAuth,
    locationController.deleteOne.bind(locationController)
);


module.exports = router;
