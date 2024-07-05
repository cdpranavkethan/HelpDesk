const mongoose=require('mongoose')
const knowledgeBaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now } 
});

// Create text index
knowledgeBaseSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);
