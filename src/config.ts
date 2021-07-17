export default {
  secret: process.env.TOKEN_SECRET || 'token_test',
  port: process.env.PORT || 3000,
  db:{
    url: process.env.MONGO_URI || 'mongodb://localhost/challangeapi'
  }
}