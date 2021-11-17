const express = require('express');
const router = express.Router();
const BaseColor = require('../models/base.model');
const Color = require('../models/color.model');
const { body } = require('express-validator');

// Get all base colors
router.get("/", async (req, res) => {
    try {
        const baseColors = await BaseColor.find({});
        res.send(baseColors);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Add base color
router.post("/",
    body("name").not().isEmpty().trim().escape(),
    async (req, res) => {
    try {
        const baseColor = new BaseColor(req.body);
        await baseColor.save();
        res.send(baseColor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update base color
router.put("/:id",
    body("name").not().isEmpty().trim().escape(),
    async (req, res) => {
    try {
        const baseColor = await BaseColor.findOneAndUpdate({_id:req.params.id}, req.body);
        res.send(baseColor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete base color
router.delete("/:id", async (req, res) => {
    try {
        const baseColor = await BaseColor.findOneAndDelete({_id:req.params.id}, req.body);
        await Color.deleteMany({parent_id: req.params.id})
        res.send(baseColor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Extended colors
router.get("/:id/extended", async (req, res) => {
    try {
        const colors = await Color.find({}).where('parent_id').equals(req.params.id);
        res.send(colors);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Add an extended Color
router.post("/:id/extended",
    body("hex").not().isEmpty().trim().escape(),
    body("token").isInt(),
    async (req, res) => {
    try {
        const color = new Color({...req.body, parent_id: req.params.id});
        await color.save();
        res.send(color);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update extended color
router.put("/:id/extended/:colorId",
    body("hex").not().isEmpty().trim().escape(),
    body("token").isInt(),
    async (req, res) => {
    try {
        await Color.findOneAndUpdate({parent_id:req.params.id, _id: req.params.colorId}, req.body);
        res.send("Color Updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete extended color
router.delete("/:id/extended/:colorId", async (req, res) => {
    try {
        await Color.findOneAndDelete({parent_id:req.params.id, _id: req.params.colorId}, req.body);
        res.send("Color Successfully Deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;