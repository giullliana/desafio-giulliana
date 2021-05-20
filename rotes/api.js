const express = require('express');
const router = express.Router();
const Parceiro = require('../rotes/models/parceiros');



// get a list of parceiros from the db
 router.get('/parceiros', async (req,res,next) => {
    //res.send({type: 'GET'});
    console.log('olha a request ',JSON.stringify(req.query))
  
   try{ 
    const getStores = await Parceiro.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
             distanceField: "dist.calculated",
        maxDistance: 500000,
        includeLocs: "dist.location",
        spherical: true
          }
        }
     ])

        console.log('olha a request ',getStores)
        res.send(getStores)
   } catch(e){
       console.log(e)
   }
  
});


// add a new  parceiro to the db
router.post('/parceiros',function(req,res,next){
    Parceiro.create(req.body).then(function(parceiro){
    res.send(parceiro);  
  }).catch(next);
  });

// update a  parceiro in the db
router.put('/parceiros/:id',function(req,res,next){
    Parceiro.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Parceiro.findOne({_id:req.params.id}).then(function(parceiro){
            res.send(parceiro);
        });
           });
    
});
//delete a parceiro from the db
router.delete('/parceiros/:id',function(req,res,next){
    Parceiro.findByIdAndRemove({_id:req.params.id}).then(function(parceiro){
  res.send(parceiro);
    });
 });

module.exports = router;