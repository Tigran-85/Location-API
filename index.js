const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./swagger");
const swaggerUi = require("swagger-ui-express");

// env
require("dotenv").config();
const port = process.env.PORT || 3000;

// routes
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationDocumentRoutes");

// database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Successfully connected database"))
  .catch((err) => {
    throw err;
  });

// ----------------------------------------

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
