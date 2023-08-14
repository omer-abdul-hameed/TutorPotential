const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await db.Student.find({});
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("Error fetching students");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await db.Student.findById(req.params.id);
        res.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).send("Error fetching student");
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Authorization header missing");
        }
        
        const token = req.headers.authorization.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decoding JWT to get user ID

        const studentData = {
            ...req.body,
            user: decoded.id
        };

        const student = await db.Student.create(studentData);
        res.json(student);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).send("Error creating student");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const student = await db.Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Error updating student");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.Student.findByIdAndDelete(req.params.id);
        res.send('Student deleted successfully');
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).send("Error deleting student");
    }
});

module.exports = router;
