const express = require('express');
const router = express.Router();
const multer = require('multer');
const BookPost = require('../models/BookPost');
const DIR = 'public';
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Create a new book post
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        // Create a new book post
        const newBookPost = new BookPost({
            bookName: req.body.bookName,
            description: req.body.description,
            author: req.body.author,
            price: req.body.price,
            user: req.body.user,
            image: req.file.path // Ensure this is the correct path
        });

        // Save the new book post to the database
        const savedBookPost = await newBookPost.save();

        // Update the user with the new post ID
        await User.findByIdAndUpdate(req.body.user, {
            $push: { post: savedBookPost._id }
        });

        // Respond with the newly created book post
        res.status(201).json(savedBookPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Fetch all book posts
router.get('/', async (req, res) => {
    try {
        const bookPosts = await BookPost.find();
        res.json(bookPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Fetch a single book post by ID
router.get('/single/:id', async (req, res) => {
    try {
        const data = await BookPost.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book post not found' });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update a book post by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            bookName: req.body.bookName,
            description: req.body.description,
            author: req.body.author,
            price: req.body.price,
            image: req.file ? req.file.path : undefined // Check if image is uploaded
        };

        const updatedBookPost = await BookPost.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBookPost) {
            return res.status(404).json({ message: 'Book post not found' });
        }
        res.json(updatedBookPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete a book post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBookPost = await BookPost.findByIdAndDelete(req.params.id);
        if (!deletedBookPost) {
            return res.status(404).json({ message: 'Book post not found' });
        }
        res.json({ message: 'Book post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
