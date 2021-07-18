import mongoose from "mongoose"
import retry from "async-retry"

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', true)

export default async function connect(url: string) {
  try {
    await retry(async bail => {
      // if anything throws, we retry
      await mongoose.connect(url, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
      })
     
      if (!mongoose.connection.readyState) {
        // don't retry upon Connection ready state 0
        bail(new Error("[db] connection can't be established"))
        return
      }
     
      console.log('[db] Successfully connected')
    }, {
      retries: 5
    })

  } catch (error) {
    console.error(error)
  }
}