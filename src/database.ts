import mongoose from "mongoose";
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', true);

export default async function connect(url: string) {
  await mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
  })
  console.log('[db] Conectada con éxito');
}