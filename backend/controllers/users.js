const express = require('express');
const router = express.Router();
const db = require('../models'); 
const { hashPassword, comparePassword } = require("../helpers/hash");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Authorization header missing");
    }

    // Extract the token
    const token = req.headers.authorization.split(" ")[1];

    try {
        // Decode the token to get the user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

router.get('/', (req, res) => {
    db.User.find({})
    .then(users => res.json(users))
})

router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
    .then(user => res.json(user))
})

router.post('/', (req, res) => {
    db.User.create(req.body)
    .then(user => {
        res.json(user)
    })
})

router.put('/:id', verifyToken, async (req, res) => {
    if (req.userId !== req.params.id) {
        return res.status(403).send("You do not have permission to modify this user.");
    }

    try {
        const userToUpdate = await db.User.findById(req.params.id);

        if (!userToUpdate) {
            return res.status(404).send("User not found.");
        }

        const { name, email, password } = req.body;

        if (name && !name.trim()) {
            return res.json({
                error: "Name is required",
            });
        }

        if (email && email !== userToUpdate.email) {
            const emailExists = await db.User.findOne({ email });
            if (emailExists) {
                return res.json({
                    error: "This email is already in use",
                });
            }
        }

        if (password && password.length < 6) {
            return res.json({
                error: "Password needs to be 6 characters or longer",
            });
        }

        if (password) {
            const hashedPassword = await hashPassword(password);
            req.body.password = hashedPassword;
        }

        const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


router.delete('/:id', verifyToken, (req, res) => {
    if (req.userId !== req.params.id) {
        return res.status(403).send("You do not have permission to delete this user.");
    }
    db.User.findByIdAndDelete(req.params.id)
        .then(() => res.send('Deleted id: ' + req.params.id));
});


module.exports = router