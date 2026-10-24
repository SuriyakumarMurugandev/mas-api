module.exports = {
  success: (data, message = 'Success') => ({
    success: true,
    message,
    data
  }),

  error: (message = 'Error', error = null) => ({
    success: false,
    message,
    error
  })
};