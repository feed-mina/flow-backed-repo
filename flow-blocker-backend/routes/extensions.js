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


router.post('/update', async(req,res) =>{
    const {userId, extensions} = req.body;
    if(!userId || !Array.isArray(extensions)){
        return res.status(400).json({message:"요청 형식이 잘못죔"});
    }

    try{
        await BlockedExtension.destroy({where:{userId}});

        const insertData = extensions.map(extension =>( {
            userId,
            extension : extension.toLowerCase(),
            isCustom : extObj.isCustom ?? true,
        }));

        await BlockedExtension.bulkCreate(insertData);

        res.json({result:'PASS', message:'차단 확장자 목록이 저장되었습니다'});
    } catch(err){
        console.log(err);
        res.status(500).json({result : 'ERROR', message:"서버 오류 발생"});
    }
});

module.exports = router;