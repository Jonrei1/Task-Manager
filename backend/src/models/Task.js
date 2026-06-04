const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: '' },
    completed:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text' });

module.exports = mongoose.model('Task', taskSchema);
