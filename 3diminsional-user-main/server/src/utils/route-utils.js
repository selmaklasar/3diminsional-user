function regexToPath(regex) {
  return regex.replace('^\\', '').replace('\\/?(?=\\/|$)', '');
}

function sanitizePath(path) {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function extractRoute(middleware, prefix) {
  const path = prefix + middleware.route.path;
  return {
    path: sanitizePath(path),
    method: Object.keys(middleware.route.methods)[0].toUpperCase(),
  };
}

function getAllRoutes(app) {
  const routes = [];

  function processStack(stack, prefix = '') {
    stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push(extractRoute(middleware, prefix));
      } else if (middleware.name === 'router' && middleware.handle.stack) {
        const nestedPrefix =
          prefix +
          (middleware.regexp.source !== '^\\/?$'
            ? regexToPath(middleware.regexp.source)
            : '');
        processStack(middleware.handle.stack, nestedPrefix);
      }
    });
  }

  processStack(app._router.stack);
  return routes;
}

function getAllPaths(routes) {
  return Object.keys(
    routes.reduce((acc, { path, method }) => {
      (acc[path] = acc[path] || []).push(method);
      return acc;
    }, {})
  );
}

module.exports = { getAllRoutes, getAllPaths, sanitizePath };
