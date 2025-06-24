import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vibe: { type: mongoose.Schema.Types.ObjectId, ref: 'Vibe', required: true },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;