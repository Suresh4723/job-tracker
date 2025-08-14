const express = require('express');
const Job = require('../models/job');
const authMiddleWare = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleWare, async (req, res) => {
    const { company, position } = req.body;

    if(!company || !position) {
        return res.status(400).json({message: 'please provide all fields'});
    }

    try {
        const job = await Job.create({
            company,
            position,
            createdBy: req.user.id,
        });

        res.status(201).json(job);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/', authMiddleWare, async (req, res) => {
    try {
        const jobs = await Job.find({createdBy: req.user.id}).sort('-createdAt');
        res.json(jobs);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', authMiddleWare, async (req, res) => {
    try{
        const job = await Job.findOne({
            _id: req.params.id,
            createdBy: req.user.id, 
        });

        if(!job) {
            return res.status(404).json({message: 'job not found'});
        }

        res.json(job);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', authMiddleWare, async (req, res) => {
    const { company, position, status } = req.body;

    try {
        let job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        job.company = company || job.company;
        job.position = position || job.position;
        job.status = status || job.status;

        await job.save();

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleWare, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;