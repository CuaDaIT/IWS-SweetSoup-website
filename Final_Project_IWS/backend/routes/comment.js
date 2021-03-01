const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req,res)=>{
    Comment.find()
    .then(accs => res.json(accs))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/add').post((req,res)=>{
    const soup_id = req.body.soup_id
    const email = req.body.email
    const name = req.body.name
    const comment = req.body.comment

    const acc = new Comment({soup_id,email,name,comment})

    acc.save()
    .then(()=>res.json("Added!"))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.route('/:soup_id').get((req,res)=>{
    Comment.find({"soup_id":req.params.soup_id})
    .then(acc=>res.json(acc))
    .catch(err=>res.status(400).json("Error :"+err))
})

router.route('/delete').delete((req,res)=>{
    Comment.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Deleted!"))
    .catch(err=>res.status(400).json("Error: "+err))
})

module.exports = router