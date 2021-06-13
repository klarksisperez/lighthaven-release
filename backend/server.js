import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import uploadTextRouter from './routers/uploadTextRouter.js';



const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connection established.'))
  .catch((error) => console.log(error.reason));

/*mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/lighthaven', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});*/

app.use('/api/uploads', uploadRouter);
app.use('/api/text_uploads', uploadTextRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);




const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/text_uploads', express.static(path.join(__dirname, '/text_uploads')));


app.get('/', (req, res)=>{
    res.send('Server is ready');
});

//middleware/error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
});