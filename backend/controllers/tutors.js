const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const tutors = await db.Tutor.find({}).populate("user", "name email").exec();
      res.json(tutors);
    } catch (error) {
      console.error("Error fetching tutors:", error);
      res.status(500).send("Error fetching tutors");
    }
  });
  

router.get('/me', async (req, res) => {
    try {
        // Check if authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).send("Authorization header missing");
        }

        // Extract the token
        const token = req.headers.authorization.split(" ")[1];

        // Decode the token to get the user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Find the tutor with a matching user property
        const tutor = await db.Tutor.findOne({ user: userId });

        if (tutor) {
            res.json(tutor);
        } else {
            // Return null if the tutor is not found
            res.json(null);
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send("Invalid token");
        }
        console.error("Error fetching tutor by user:", error);
        res.status(500).send("Error fetching tutor by user");
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
