const express = require('express')
const router = express.Router()
const { Type } = require('../db');

router.get('/', async (req, res) => {
    try{
        let typesPromise = await Type.findAll();
        let types = typesPromise.map(type => type.dataValues.name)
        res.status(200).json(types);
    } catch (error){
        console.log(error);
    }
})

module.exports = router