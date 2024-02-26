const axios = require('axios');
const baseUrl = 'http://localhost:3000/api';

const createLocationDocument = async function(url, body) {
    return axios.post(`${baseUrl}${url}`, body);
};

const getAllLocationDocuments = async function(url, body) {
    return axios.get(`${baseUrl}${url}`);
};

const getByLocationId  = async function(url) {
    return axios.get(`${baseUrl}${url}`);
};

const updateLocationById  = async function(url, body, headers) {
    return axios.patch(`${baseUrl}${url}`, body, headers);
};

const updateLocationsByCategory  = async function(url, body, headers) {
    return axios.patch(`${baseUrl}${url}`, body, headers);
};

const deleteLocationsById  = async function(url, headers) {
    return axios.delete(`${baseUrl}${url}`, headers);
};

const getUserToken  = async function(url, body) {
    return axios.post(`${baseUrl}${url}`, body);
};

module.exports = {
    createLocationDocument,
    getAllLocationDocuments,
    getByLocationId,
    updateLocationById,
    getUserToken,
    updateLocationsByCategory,
    deleteLocationsById
};