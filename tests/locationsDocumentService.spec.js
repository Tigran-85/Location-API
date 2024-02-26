const { ObjectId } = require('mongoose').Types;

const {
  createLocationDocument,
  getAllLocationDocuments,
  getByLocationId,
  updateLocationById,
  getUserToken,
  updateLocationsByCategory,
  deleteLocationsById
} = require("./helpers/serviceHelper");
const { body, query, messages, responseData, statusCodes } = require("./data/testData.json");

describe("Testing location document service", () => {

  describe("create location document", () => {
    const { createInput } = body;

    it("should create location document", async () => {
      const response = await createLocationDocument('/locations', createInput)

      expect(response.status).toBe(statusCodes.successCreatedCode);
      expect(ObjectId.isValid(response.data.data.location_id)).toBe(true);
      expect(response.data.message).toBe(messages.createLocationDocumentSuccess);
    })

  });

  describe('getAll', () => {

    it('should return all locations with pagination data', async () => {

      const { locationParams } = query;
      const { page, page_size, category } = locationParams;
      const response = await getAllLocationDocuments(`/locations?page=${page}&page_size=${page_size}&category=${category}`);;
      const { pagination } = responseData;

      expect(response.status).toBe(statusCodes.successStatusCode);
      expect(response.data.data.pagination).toEqual(pagination);
    })
  });

  describe('getById', () => {
    const { locationParams } = query;
    const { validId, inValidId } = locationParams;

    it('should return a specific location document by id', async () => {

      const response = await getByLocationId(`/locations/${validId}`);

      expect(response.status).toBe(statusCodes.successStatusCode);
      expect(response.data.data.location._id).toEqual(validId);
    });

    it('should return not found message', async () => {

      try {
        const response = await getByLocationId(`/locations/${inValidId}`);

        expect(response.status).toBe(statusCodes.notFoundStatusCode);
        expect(response.data.message).toEqual(messages.locationNotFoundMessage);
      } catch (error) {
        console.log(error.message)
      }
    });
  });

  describe('updateById',  () => {
    let token;
    const { loginData, createInput } = body;
    const { locationParams } = query;
    const { validId, inValidId } = locationParams;

    beforeEach(async () => {
      const responseUserData = await getUserToken(`/auth/sign-in`, loginData);
       token = responseUserData.data.data.token;
    })

    it('should update a specific location document by id', async () => {

      const headers = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      const response = await updateLocationById(`/locations/${validId}`, createInput, headers);

      expect(response.status).toBe(statusCodes.successStatusCode);
      expect(response.data.message).toEqual(messages.updateLocationDocumentSuccess);
    });

    it('should return not found message', async () => {

      try {
        const response = await updateLocationById(`/locations/${inValidId}`, createInput, headers);

        expect(response.status).toBe(statusCodes.notFoundStatusCode);
        expect(response.data.message).toEqual(messages.locationNotFoundMessage);
      } catch (error) {
        console.log(error.message)
      }
    });

    it('should return Unauthorized message', async () => {
      try {
        const response = await updateLocationById(`/locations/${inValidId}`, createInput);

        expect(response.status).toBe(statusCodes.UnauthorizedCode);
        expect(response.data.message).toEqual(messages.UnauthorizedMessage);
      } catch (error) {
        console.log(error.message)
      }
    });
  });

  describe('updateByCategory',  () => {
    let token;
    const { loginData, createInput } = body;
    const { locationParams } = query;

    beforeEach(async () => {
      const responseUserData = await getUserToken(`/auth/sign-in`, loginData);
      token = responseUserData.data.data.token;
    })

    it('should update a locations document by category', async () => {
      const { locationParams } = query;
      const headers = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      const response = await updateLocationsByCategory(`/locations/?category=${locationParams.category}`, createInput, headers);

      expect(response.status).toBe(statusCodes.successStatusCode);
      expect(response.data.message).toEqual(messages.updateLocationsDocumentSuccess);
    });

    it('should return not found message', async () => {

      try {
        const response = await updateLocationsByCategory(`/locations/?category=${locationParams.invalidCategory}`, createInput, headers);

        expect(response.status).toBe(statusCodes.notFoundStatusCode);
        expect(response.data.message).toEqual(messages.locationsNotFoundMessage);
      } catch (error) {
        console.log(error.message)
      }
    });

    it('should return Unauthorized message', async () => {
      try {
        const response = await updateLocationsByCategory(`/locations/?category=${locationParams.invalidCategory}`, createInput);

        expect(response.status).toBe(statusCodes.UnauthorizedCode);
        expect(response.data.message).toEqual(messages.UnauthorizedMessage);
      } catch (error) {
        console.log(error.message)
      }
    });
  });

  describe('deleteById',  () => {
    let token;
    const { locationParams } = query;
    const { validId, inValidId } = locationParams;
    const { loginData } = body;

    beforeEach(async () => {
      const responseUserData = await getUserToken(`/auth/sign-in`, loginData);
      token = responseUserData.data.data.token;
    })

    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    it('should delete a specific location document by id', async () => {

      const headers = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      const response = await deleteLocationsById(`/locations/${validId}`, headers);

      expect(response.status).toBe(statusCodes.successStatusCode);
      expect(response.data.message).toEqual(messages.deleteLocationDocumentSuccess);
    });

    it('should return not found message', async () => {

      try {
        const response = await deleteLocationsById(`/locations/${inValidId}`, headers);

        expect(response.status).toBe(statusCodes.notFoundStatusCode);
        expect(response.data.message).toEqual(messages.locationNotFoundMessage);
      } catch (error) {
        console.log(error.message)
      }
    });

    it('should return Unauthorized message', async () => {
      try {
        const response = await deleteLocationsById(`/locations/${inValidId}`);

        expect(response.status).toBe(statusCodes.UnauthorizedCode);
        expect(response.data.message).toEqual(messages.UnauthorizedMessage);
      } catch (error) {
        console.log(error.message)
      }
    });
  });
});
