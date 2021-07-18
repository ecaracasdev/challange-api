export default {
  secret: process.env.TOKEN_SECRET || 'token_test',
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGO_URI || 'mongodb://localhost/challangeapi'
  },
  messages: {
    successSignup: 'Successfully registered user',
    loginFailed:'There is no registered user associate to the provided username or email',
    loginError: 'Email or password are wrong',
    loginSuccess: 'Login success',
    profileInfo: 'Profile info',
    tokenExpired:'The provided token has expired you have to login again',
    provideToken:'The action can not be done without login first',
    requireModeratorRole: 'Require moderator role',
    requireAdminRole: 'Require admin role',
    roleValidationError: 'An error ocurred while user validation',
    sonsList:'List of sons',
    sonFound:'Son found',
    listSonLimit:'List of sons max 10',
    sonCreated:'Son Created and registered as User',
    sonUpdated:'Son Updated',
    sonDeleted:'Son Deleted',
    usersList:'List of users',
    userFound:'User found',
    userCreated:'User Created',
    userUpdated:'User updated',
    userDeleted:'User deleted',
    userNotFound:'User not found',
    permissionDenied:'You are not allow to do this action',
    sonByidNotFound: 'There is no son asociate at that id'
  }
}