//route_upload 
const express = require('express');
const router = express.Router();
const{ UploadLog, BlockedExtension} = require('../models');

router.get('/', async(req, res) =>{
    const {userId, fileName} = req.query;
    const extension = fileName.split("/").pop().toLowerCase();

    const isBlocked = await BlockedExtension.findOne({
        where: {userId, extension},
    });

    await UploadLog.create({ userId, fileName, extension, result});

    res.json({result, message: result === 'BLOCK' ? "차단된 확장자입니다" : "업로드 완료"});

    module.exports = router;


})