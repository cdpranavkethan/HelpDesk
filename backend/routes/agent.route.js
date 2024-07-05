const express = require('express');
const router = express.Router();
const agentData = require('../models/agent.model');
router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.get('/',async(req,res) => {
    try{
        const data=await agentData.find()
        res.json(data)
    }catch (error) {
        console.error("Error fetching agent analytics:", error);
        res.status(500).json({ error: "Failed to fetch agent analytics" });
    }
});
router.post('/post',async(req,res) => {
    try{
        const newItem=await agentData.create(req.body)

        res.status(201).json(newItem);
    }
    catch (error) {
        console.error("Error fetching agent analytics:", error);
        res.status(500).json({ error: "Failed to fetch agent analytics" });
    }

});


module.exports = router;