//route_upload 
const express = require('express');
const router = express.Router();
const{ UploadLog, BlockedExtension} = require('../models');

router.post('/', async(req, res) =>{
    const {userId, fileName} = req.body;
    const extension = fileName.split(".").pop().toLowerCase();

    const isBlocked = await BlockedExtension.findOne({
        where: {userId, extension},
    });
  const result = isBlocked ? 'BLOCK' : 'PASS';

    await UploadLog.create({ userId, fileName, extension, result});

    res.json({result, message: result === 'BLOCK' ? `error "extension" 차단된 확장자입니다` : `"${fileName}" 업로드 성공`});
});
module.exports = router;
