//route_extensions 
const express = require('express');
const router = express.Router();
const { BlockedExtension} = require('../models');
const { where } = require('sequelize');

router.get('/:userId', async(req, res) =>{
    const {userId} = req.params;
    const list = await BlockedExtension.findAll({where:{userId}});
    res.json(list);
});

router.post('/', async(req,res) => {
    const {userId, extension} = req.body;

    await BlockedExtension.create({
        userId,
        extension: extension.toLowerCase(),
        isCustom : true,
    });

    res.json({success:true});
});

module.exports = router;