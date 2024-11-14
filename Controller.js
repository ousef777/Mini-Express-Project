let Book = require('./Book');

exports.booksGet = async (req, res, next) => {
    try {
        const list = await Book.find();
        // console.log(list);
        res.status(200).json(list);
        // res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const foundBook = await Book.findById(id);
        if (foundBook) {
            console.log(foundBook);
            res.status(201).json(foundBook);
        }
        else res.status(404).json({ message: 'Book not found' });
    } catch (error) {
        next(error);
    }
};

exports.bookCreate = async (req, res, next) => {
    try {
        console.log(req.body);
        const newBook = { ...req.body };
        if (req.file)
            newBook.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};

exports.bookDelete = (req, res, next) => {
    const { id } = req.params;
    try {
        const foundBook = Book.findById(id);
        if (foundBook == null) {
            console.log(foundBook);
            res.status(404).json({ message: 'Book not found' });
        } else {
            Book.deleteOne(foundBook);
            res.status(204).end();
        }
    } catch (error) {
        next(error);
    }
};

exports.bookUpdate = async (req, res, next) => {

    const { id } = req.params;
    const foundBook = await Book.findById(id);
    if (foundBook == null) {
        console.log(foundBook);
        res.status(404).json({ message: 'Book not found' });
    }
    try {
        await foundBook.updateOne(req.body);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
