import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true
  },
  bookAuthor: {
    type: String,
    required: true
  },
  bookImage: {
    type: String,
    default: null
  },
  bookReleasedYear: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);

