const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const router = express.Router();

// Configure multer for image storage in 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Route to upload an image
router.post('/', upload.single('imageFile'), async (req, res) => {
    try {
        const { imageTitle, imageDescription } = req.body;
        const newImage = new Image({
            imageTitle,
            imageDescription,
            imageUrl: `/uploads/${req.file.filename}`,
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload image', error });
    }
});

// Route to fetch all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch images', error });
    }
});

module.exports = router;
