// higher-order function that wraps async route handlers
// eliminates the need for try/catch in every controller
// any thrown error or rejected promise is forwarded to Express error middleware via next()
// usage: asyncHandler(async (req, res) => { ... })
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
