export default {
  secret: process.env.TOKEN_SECRET || 'token_test',
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGO_URI || 'mongodb://localhost/challangeapi'
  },
  messages: {
    successSignup: 'Successfully registered user',
    loginError: 'Email or password are wrong',
    loginSuccess: 'Login success',
    profileInfo: 'Profile info',
    tokenExpired:'The provided token has expired you have to login again',
    provideToken:'The action can not be done without login first',
    requireModeratorRole: 'Require moderator role',
    requireAdminRole: 'Require admin role',
    roleValidationError: 'An error ocurred while user validation'
  }
}