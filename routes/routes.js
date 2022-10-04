const express = require('express');
const res = require('express/lib/response');

const router = express.Router()
const Model = require('../model/model');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        balance: req.body.balance,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by email Method
router.get('/getOne/:email', async (req, res) => {
    try{
        const data = await Model.findOne({email: req.params.email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by email Method
router.patch('/update/:email', async (req, res) => {
    try {
        const filter = { email: req.params.email};
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findOneAndUpdate(
            filter, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router;
