const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const BaseService = require('./BaseService');
const { createToken, verifyToken } = require('../common/token');

module.exports = class AuthService extends BaseService {

  constructor() {
    super();
  }

  async signUp(req) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const err = this.handleErrors(req);
      if(err.hasErrors) {
        return err.body;
      }

      const user = await userModel.findOne({ email }).exec();

      if(user) {
        return this.response({
          status: false,
          statusCode: 409,
          message: 'User already exists'
        });
      }

      const createUser = await userModel.create({
        firstName,
        lastName,
        password,
        email,
      });

      if(createUser) {
        const token = createToken({
          payload: {
            id: createUser._id
          },
          options: {
            expiresIn: process.env.JWT_EXPIRES_IN
          }
        });

        return this.response({
          data: { token },
          statusCode: 201,
          message: 'User Registered successfully'
        });
      }
    } catch(error) {
      console.log(error)
      return this.serverErrorResponse(error);
    }
  }

  async signIn(req) {
    try {
      const err = this.handleErrors(req);
      if(err.hasErrors) {
        return err.body;
      }

      const { email, password } = req.body;

      const user = await userModel.findOne({ email }).exec();

      if(user && bcrypt.compareSync(password, user.password)) {

          const token = createToken({
            payload: {
              id: user._id
            },
            options: {
              expiresIn: process.env.JWT_EXPIRES_IN
            }
          });

          return this.response({
            data: {
              token,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }
            }
          });
      }

      return this.response({
        statusCode: 400,
        status: false,
        message: 'Incorrect email and/or password'
      });

    } catch(error) {
      console.log(error)
      return this.serverErrorResponse(error);
    }
  }
};
