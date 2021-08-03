const express = require('express')
const router = express.Router()
const { Type } = require('../db');

router.get('/', async (req, res) => {
    try{
        let allTypes = await Type.findAll(
            // exclude: createdAt, updatedAt
        );
        res.status(200).json(allTypes);
    } catch (error){
        console.log(error);
    }
})

module.exports = router