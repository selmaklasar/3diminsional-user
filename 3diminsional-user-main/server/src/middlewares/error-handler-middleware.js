const createHttpError = require('http-errors');
const logger = require('../libs/logger');
const createResponseObject = require('../utils/create-response-object');
const {
  getAllRoutes,
  getAllPaths,
  sanitizePath,
} = require('../utils/route-utils');


function handleMethodNotAllowed(app) {
  const routes = getAllRoutes(app);
  const paths = getAllPaths(routes);
  return (req, _, next) => {
    if (paths.includes(sanitizePath(req.path)))
      throw createHttpError.MethodNotAllowed();
    return next();
  };
}

function handleApiNotFound() {
  throw createHttpError.NotFound('API not found');
}

// eslint-disable-next-line no-unused-vars
function hanldeError(err, _, res, _next) {
  logger.error(err.statusCode ? err.message : err.stack);
  res.status(err.statusCode || 500).json(
    createResponseObject({
      success: false,
      message: 'An error has occured! 💥',
      error: {
        statusCode: err.statusCode || 500,
        name: err.name || 'InternalServerError',
        message: err.message || 'Internal Server Error',
      },
    })
  );
}

module.exports = (app) => [
  handleMethodNotAllowed(app),
  handleApiNotFound,
  hanldeError,
];

