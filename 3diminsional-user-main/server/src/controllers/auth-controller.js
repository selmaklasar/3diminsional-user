const createHttpError = require('http-errors');
const passport = require('../libs/passport');
const userServices = require('../services/user-services');
const jwt = require('../libs/jwt');
const bcrypt = require('../libs/bcrypt');

function createTokens(id) {
  const accessToken = jwt.generateAccessToken({ id });
  const refreshToken = jwt.generateRefreshToken({ id });
  return { accessToken, refreshToken };
}

module.exports = {
  async login(req, res, next) {
    try {
      const loginData = req.body;
      const foundUser = await userServices.findUser({ email: loginData.email });
      if (!foundUser)
        throw createHttpError.Unauthorized('Invalid email or password');
      const isPasswordCorrect = await bcrypt.checkPassword(
        loginData.password,
        foundUser.password
      );
      if (!isPasswordCorrect)
        throw createHttpError.Unauthorized('Invalid email or password');
       tokens = createTokens(foundUser);
       res.cookie('accessToken', tokens.accessToken, {
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
      });
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: false,  
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict', 
      });

      res.formatResponse({},'success');
    } catch (error) {
      next(error);
    }
  },

  async registerUser(req, res, next) {
    try {
      const userData = req.body;
      const foundUser = await userServices.findUser({ email: userData.email });
      if (foundUser)
        throw createHttpError.Conflict('Email has already been registered');
      userData.password = await bcrypt.hashPassword(userData.password);
      const { _id } = await userServices.createUser(userData);
      res.formatResponse({},'success');
    } catch (error) {
      next(error);
    }
  },

  async loginOrRegisterWithGoogle(req, res, next) {
    try {
      passport.authenticate('google', { failureRedirect: 'http://localhost:8000/signup' }, async (err, userAccount) => {
        if (err) {
          throw createHttpError.InternalServerError(err.message);
        }
        if (!userAccount) {
          throw createHttpError.Unauthorized();
        }
        
        const {
          _json: {
            sub: id,
            given_name: firstName,
            family_name: lastName,
            picture: imageUrl,
            email,
          },
        } = userAccount;
        
        const foundUser = await userServices.findUser({ email });
        let tokens;
        
        if (foundUser) {
          tokens = createTokens(foundUser._id);
        } else {
          const userData = {
            firstName,
            lastName,
            imageUrl,
            email,
            additionalInfo: {
              googleId: id,
            },
          };
          const newUser = await userServices.createUser(userData);
          tokens = createTokens(newUser._id);
        }
  
        res.cookie('accessToken', tokens.accessToken, {
          httpOnly: false, 
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict', 
        });
        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: false,  
          secure: process.env.NODE_ENV === 'production',  
          sameSite: 'strict', 
        });
  
   
        res.redirect('http://localhost:8080/home');
      })(req, res);
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
     
      if (!refreshToken) {
        throw createHttpError.BadRequest('Refresh token is required');
      }
      const userId = jwt.verifyRefershToken(refreshToken);

      if (!userId) {
        throw createHttpError.Unauthorized('Invalid refresh token');
      }
      const foundUser = await userServices.findUser({ _id: userId.id });
      if (!foundUser) {
        throw createHttpError.Unauthorized('User not found');
      }
      const newTokens = createTokens(foundUser._id);
    
      res.formatResponse(newTokens);
    } catch (error) {
      next(error);
    }
  },
};
