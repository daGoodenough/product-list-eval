const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product');
const Review = require('../models/review')


router.use((req, res, next) => {
  console.log(`The url is ${req.url}`)
  next();
})

router.param('productId', async (req, res, next, id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await Product.findById(id);
    req.product = product;
  } else {
    console.error(`Invalid id: ${id}`)
  }

  next();
})

router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;
  const category = req.query.category;

  let query = {}
  if (category) {
    query = {category};
  }

  Product.find(query)
    .skip((Number(page) - 1) * limit)
    .limit(Number(limit))
    .exec((error, products) => {
      if (error) throw error;
      res.send(products)
    })
})

router.post('/', (req, res) => {
  const product = new Product();

  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = 'https://via.placeholder.com/250?text=Product+Image';

  product.save((err, product) => {
    if (err) {
      const response = {
        "error": true,
        "message": err
      }
      res.json(response);
    }

    res.send(product);
  })
})


router.get('/:productId', (req, res, next) => {
  if(!req.product){
    res.status(404).send("product not found");
  }
  
  res.send(req.product);
})

router.delete('/:productId', (req, res) => {
  Product.deleteOne({_id: req.params.productId}, (err, product) => {
    if (err) {
      const response = {
        "error": true,
        "message": err
      }
      res.json(response);
    }
    res.send(product);
  })
})

router.get('/:productId/reviews', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    await req.product
      .populate(
        {
          path: 'reviews',
          options: {
            skip: (Number(page) - 1) * limit,
            limit
          }
        })

    res.send(req.product.reviews)
  } catch (e) {
    console.error(e)
  }
})

router.post('/:productId/reviews', async (req, res) => {
  const review = new Review();

  review.username = req.body.username;
  review.text = req.body.text;
  review.product = req.product._id;

  req.product.reviews.push(review);


  req.product.save((err, product) => {
    if (err) {
      throw err;
    };
  })
  review.save((err, review) => {
    if (err) {
      const response = {
        "error": true,
        "message": err
      }
      res.json(response);
    }
    res.send(review);
  })
})

module.exports = router;