const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tutors = await db.Tutor.find({});
        res.json(tutors);
    } catch (error) {
        console.error("Error fetching tutors:", error);
        res.status(500).send("Error fetching tutors");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tutor = await db.Tutor.findById(req.params.id);
        res.json(tutor);
    } catch (error) {
        console.error("Error fetching tutor:", error);
        res.status(500).send("Error fetching tutor");
    }
});

router.post('/', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extracts token from "Bearer <token>"
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decoding JWT to get user ID

        const tutorData = {
            ...req.body,
            user: decoded.id
        };

        const tutor = await db.Tutor.create(tutorData);
        res.json(tutor);
    } catch (error) {
        console.error("Error creating tutor:", error);
        res.status(500).send("Error creating tutor");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const tutor = await db.Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tutor);
    } catch (error) {
        console.error("Error updating tutor:", error);
        res.status(500).send("Error updating tutor");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.Tutor.findByIdAndDelete(req.params.id);
        res.send('Tutor deleted successfully');
    } catch (error) {
        console.error("Error deleting tutor:", error);
        res.status(500).send("Error deleting tutor");
    }
});

module.exports = router;