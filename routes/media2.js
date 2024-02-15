const express = require("express");
const mediaRoutes = express.Router();
const dbObject = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const Main = require("../models/main.js");

// Middleware to handle errors
function handleError(res, err) {
    console.error(err);
    res.status(500).json({ error: err.message });
}

// Get all main media
mediaRoutes.route("/media").get(async function(req, res) {
    try {
        const db = dbObject.getDb("toshokanime");
        const result = await db.collection("main").find({}).toArray();
        res.json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// Get a single main media by id
mediaRoutes.route("/media/:id").get(async function(req, res) {
    try {
        const db = dbObject.getDb("toshokanime");
        const myquery = { _id: ObjectId(req.params.id) };
        const result = await db.collection("main").findOne(myquery);
        res.json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// Create a new main media
mediaRoutes.route("/media/add").post(async function(req, res) {
    try {
        const db = dbObject.getDb("toshokanime");
        const myobj = { ...req.body };
        const result = await db.collection("main").insertOne(myobj);
        res.json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// Update a main media by id
mediaRoutes.route("/media/update/:id").put(async function(req, res) {
    try {
        const db = dbObject.getDb("toshokanime");
        const myquery = { _id: ObjectId(req.params.id) };
        const newvalues = { $set: { ...req.body } };
        const result = await db.collection("main").updateOne(myquery, newvalues);
        res.json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// Delete a main media by id
mediaRoutes.route("/media/delete/:id").delete(async (req, res) => {
    try {
        const db = dbObject.getDb("toshokanime");
        const myquery = { _id: ObjectId(req.params.id) };
        const result = await db.collection("main").deleteOne(myquery);
        res.json(result);
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = mediaRoutes;
