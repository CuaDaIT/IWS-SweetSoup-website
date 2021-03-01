const router = require('express').Router()
let Order = require('../models/order.model')

router.route('/').get((req,res)=>{
    Order.find()
    .then(orders=>res.json(orders))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.route('/:id').get((req,res)=>{
    Order.findById(req.params.id)
    .then(order=>res.json(order))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.route('/add').post((req,res)=>{
    let order = new Order(req.body)
    order.save()
    .then(()=>res.json("Added!"))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.route('/delete/:id').delete((req,res)=>{
    Order.findOneAndDelete({"id":req.params.id})
    .then(()=>res.json("Deleted!"))
    .catch(err=>res.status(400).json("Error: "+err))
})

module.exports = router