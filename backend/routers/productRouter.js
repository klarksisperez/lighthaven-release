import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import AdminActivity from '../models/auditModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const title = req.query.title || '';
    const titleFilter = title ? { title: { $regex: title, $options: 'i' } } : {};
    //const products = await Product.find({});

    const products = await Product.find({
      ...titleFilter,
    });

    res.send(products);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      title: 'Lorem Ipsum (' + Date.now() + ')',
      author: 'J. Doe',
      genre: 'Test',
      image: '/images/default_book.png',
      textfile: '/images/lorem-ipsum.pdf',
      countInStock: 0,
      rating: 0,
      numreview: 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ipsum nulla. Aliquam facilisis purus non sodales venenatis. Pellentesque eu consectetur libero. Etiam tincidunt sodales tellus eget semper. Nullam non nibh malesuada, elementum turpis at, fringilla est. Fusce in felis dui. Etiam aliquet, dui vitae porttitor laoreet, nulla metus sodales nibh, sed interdum lacus dolor sed nisi. Nunc nec justo ut lectus rhoncus placerat. Nulla ullamcorper, augue id ornare fringilla, arcu dolor auctor purus, quis volutpat nisi diam tempus tortor.',

    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
    
    const newActivity = new AdminActivity({
      designation: "admin",
      action: "Added a Product",
      title: product.title
    })
    const savedActivity = await newActivity.save()
    res.send({ message: 'Added to Audit Trail', newActivity: savedActivity });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.title = req.body.title;
      product.author = req.body.author;
      product.genre = req.body.genre;
      product.image = req.body.image;
      product.textfile = req.body.textfile;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });

      const newActivity = new AdminActivity({
        designation: "admin",
        action: "Updated a Product",
        title: product.title
      })
      const savedActivity = await newActivity.save()
      res.send({ message: 'Added to Audit Trail', newActivity: savedActivity });

    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });

      const newActivity = new AdminActivity({
        designation: "admin",
        action: "Deleted a Product",
        title: product.title
      })
      const savedActivity = await newActivity.save()
      res.send({ message: 'Added to Audit Trail', newActivity: savedActivity });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numreview = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;