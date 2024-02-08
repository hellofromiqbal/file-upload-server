import express from 'express';
import multer from 'multer';
import { Book } from '../models/bookModel.js';
import { uploadToCloudinary } from '../services/cloudinary.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json({
      message: 'All books fetched.',
      data: allBooks
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
});

// CREATE NEW BOOK
router.post("/new", upload.single('bookImage'), async (req, res) => {
  try {
    const { bookTitle, bookAuthor, bookReleasedYear } = req.body;
    console.log(req.file);

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.path, { folder: "public/images", use_filename: true });

    // Create new book with Cloudinary image URL
    const newBook = await Book.create({
      bookTitle,
      bookAuthor,
      bookReleasedYear,
      bookImage: cloudinaryResult.url // Use the Cloudinary URL here
    });

    return res.status(200).json({
      message: "Book created successfully",
      data: newBook
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
});

export default router;