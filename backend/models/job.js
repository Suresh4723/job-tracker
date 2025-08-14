const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide a company name'],
        },
        position: {
            type: String,
            required: [true, 'Please provide a position'],
        },
        status: {
            type: String,
            enum: ['pending', 'interview', 'declined'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
