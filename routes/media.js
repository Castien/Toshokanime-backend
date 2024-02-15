const express = require("express");
const mediaRoutes = express.Router();
const Main = require("../models/main.js");

// Middleware to handle errors
function handleError(res, err) {
    console.error(err);
    res.status(500).json({ error: err.message });
}

// Get all main media
mediaRoutes.route("/media").get(async function(req, res) {
    try {
        const mainMedia = await Main.find();
        res.json(mainMedia);
    } catch (err) {
        handleError(res, err);
    }
});

// Get a single main media by id
mediaRoutes.route("/media/:id").get(async function(req, res) {
    try {
        const mainMedia = await Main.findById(req.params.id);
        if (!mainMedia) {
            return res.status(404).json({ error: 'Main media not found' });
        }
        res.json(mainMedia);
    } catch (err) {
        handleError(res, err);
    }
});

// Create a new main media
mediaRoutes.route("/media/add").post(async function(req, res) {
    try {
        const newMainMedia = new Main(req.body);
        await newMainMedia.save();
        res.status(201).json(newMainMedia);
    } catch (err) {
        handleError(res, err);
    }
});

// Update a main media by id
mediaRoutes.route("/media/update/:id").put(async function(req, res) {
    try {
        const updatedMainMedia = await Main.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMainMedia) {
            return res.status(404).json({ error: 'Main media not found' });
        }
        res.json(updatedMainMedia);
    } catch (err) {
        handleError(res, err);
    }
});

// Delete a main media by id
mediaRoutes.route("/media/delete/:id").delete(async (req, res) => {
    try {
        const deletedMainMedia = await Main.findByIdAndDelete(req.params.id);
        if (!deletedMainMedia) {
            return res.status(404).json({ error: 'Main media not found' });
        }
        res.json({ message: 'Main media deleted successfully' });
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = mediaRoutes;
