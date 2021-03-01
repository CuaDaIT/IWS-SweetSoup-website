const router = require('express').Router();
let Soup = require('../models/sweetSoup.model');

router.route('/').get((req,res)=>{
    Soup.find()
    .then(soups => res.json(soups))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const img1 = req.body.img1
    const img2 = req.body.img2

    const newSoup = new Soup({
        name,
        description,
        price,
        img1,
        img2
    });

    newSoup.save()
    .then(()=> res.json('Soup added!'))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/:id').get((req,res)=>{
    Soup.findById(req.params.id)
    .then(soup=>res.json(soup))
    .catch(err=>res.status(400).json("Errorr: "+err));
})

router.route('/delete?:id').delete((req,res)=>{
    Soup.findOneAndDelete({"id":Number(req.params.id)})
    .then(()=>res.json("Deleted!"))
    .catch(err=>res.status(400).json("Error: "+err));
})

module.exports = router;