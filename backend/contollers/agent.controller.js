const agentModel=require('../models/agent.model');

async function getData(req,res){
    try{
        const allData=await agentModel.find()
        res.status(201).json(allData);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports={getData};