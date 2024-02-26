[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Location API app

Express Js Location API test application

## Description

For database used **MongoDB** with **Mongoose**.

## Installation

```bash
npm install
```

## Running development mode

```bash
npm run dev
```

## Running production mode

```bash
npm start
```

## Routes

Starting point "localhost:3000"

# Location API Documentation

This document outlines the endpoints and methods available for interacting with the Location API.

## Creating a Location Document

- **Endpoint:** `/api/locations`
- **Method:** `POST`

## Paginated Retrieval of All Documents

- **Endpoint:** `/api/locations`
- **Method:** `GET`
- **Parameters:**
    - `page` (default: 1): Page number for pagination.
    - `page_size` (default: 10): Number of locations per page.
    - `category` Location category.

## Retrieval of a Specific Location Document by ID

- **Endpoint:** `/api/locations/{location_id}`
- **Method:** `GET`
- **Path Parameters:**
    - `location_id`: Unique identifier of the location.

## Paginated Retrieval of Location Documents Based on Category

- **Endpoint:** `/api/locations`
- **Method:** `GET`
- **Query Parameters:**
    - `category`: The category of locations to be retrieved.
    - `page` (default: 1): Page number for pagination.
    - `page_size` (default: 10): Number of locations per page.

## Updating a Location Document by Its ID

- **Endpoint:** `/api/locations/{location_id}`
- **Method:** `PATCH`
- **Query Parameters:**
    - `location_id`: Unique identifier of the location.
- **Authentication Required:** Bearer {token}

## Updating Location Documents by Their Category

- **Endpoint:** `/api/locations`
- **Method:** `PATCH`
- **Query Parameters:**
    - `category`: The category of locations to be updated.
- **Authentication Required:** Bearer {token}

## Deleting a Location Document by Its ID

- **Endpoint:** `/api/locations/{location_id}`
- **Method:** `DELETE`
- **Query Parameters:**
    - `location_id`: Unique identifier of the location.
- **Authentication Required:** Bearer {token}


# Users Authentication API

## Registration

- **Endpoint:** `/api/auth/sign-up`
- **Method:** `POST`
- **Body:**
    - `firstName`: Must contain at least 3 characters.
    - `lastName`: Must contain at least 3 characters.
    - `email`: Must be valid email.
    - `password`: Must contain at least 1 uppercase, 3 lowercase, 2 numbers and 1 special character.


## Login

- **Endpoint:** `/api/auth/sign-in`
- **Method:** `POST`
- **Body:**
    - `email`: Must be valid email.
    - `password`: Must contain at least 5 characters  