const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  _id: String,
  name: String,
  short_description: String,
  description: String,
  book_cover: String,
  authors: [
    {
      id: Number,
      name: String,
      slug: String,
    }
  ],
  categories: {
    id: Number,
    name: String,
    is_leaf: Boolean,
  },
  current_seller: {
    id: Number,
    sku: String,
    name: String,
    link: String,
    logo: String,
    price: Number,
    product_id: String,
    store_id: Number,
    is_best_store: Boolean,
    is_offline_installment_supported: Boolean
  },
  original_price: Number,
  list_price: Number,
  quantity_sold: {
    text: String,
    value: Number
  },
  rating_average: Number,
  images: [
    {
      base_url: String,
      is_gallery: Boolean,
      label: String,
      large_url: String,
      medium_url: String,
      position: Number,
      small_url: String,
      thumbnail_url: String
    }
  ],
  specifications: [
    {
      name: String,
      attributes: [
        {
          code: String,
          name: String,
          value: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Book", BookSchema);