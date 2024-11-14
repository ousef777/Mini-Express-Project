const express = require('express');
const router = express.Router();
const {
    booksGet,
    getBookById,
    bookCreate,
    bookUpdate,
    bookDelete,
} = require('./Controller');
const upload = require("./multer");
const handleErrors = require("./middleware")

function validate(req, res, next) {
    console.log("validating");
    next();
}

router.get('/', validate, booksGet, handleErrors);

router.get('/:id', getBookById, handleErrors);

router.post('/', upload.single('image'), bookCreate, handleErrors);

router.put('/:id', bookUpdate, handleErrors);

router.delete('/:id', bookDelete, handleErrors);

module.exports = router;