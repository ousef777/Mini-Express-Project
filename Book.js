const { model, Schema } = require('mongoose');

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, default: 5 },
    image: { type: String, default: "./media/book-placeholder.png" },
});

module.exports = model('Book', BookSchema);