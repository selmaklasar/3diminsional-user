module.exports = ({ success, message, data, error }) => ({
  success,
  timestamp: new Date().toISOString(),
  message,
  data,
  error,
});
