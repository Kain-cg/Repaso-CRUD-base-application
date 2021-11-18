const router = require("express").Router();
const Coaster = require('../models/Coaster.model');
const Park = require("../models/Park.model");



// Endpoints

// Render Create Form
router.get("/new-coaster", (req, res, next) => {
    Park.find()
    .then (allParks => res.render("coasters/new-coaster", {allParks}));
    
});

//create coaster
router.post('/create-coaster', (req, res, next) => {
    console.log(req.body)
	Coaster.create({
		name: req.body.name,
		description: req.body.description,
        inversions: req.body.inversions,
        length: req.body.length,
        park_id: req.body.park_id,
	})
		.then(() => res.redirect("/coasters/index-coasters"))
		.catch(err => next(error))

});

// catches park-list URL and actually renders it

// router.get("/index-coasters", (req, res, next) => {
//     res.render("coasters/coaster-index");
// });

router.get("/index-coasters", (req, res, next) => {
    Coaster.find()
    .populate("park_id")
    .then (allCoasters => res.render("coasters/coaster-index", {allCoasters}))
    .catch(err => next(error));
});

//get details for a coaster by id
router.get("/:id", (req, res, next) => {
    
    const { id } = req.params
  
    Coaster.findById(id)
      .populate("park_id")
      .then(oneCoaster => res.render("coasters/coaster-details", oneCoaster))
      .catch(err => console.log(err))
  
});

// borrar montaña rusa y eso
router.get('/:id/delete', (req, res, next) => {
	Coaster.findByIdAndRemove(req.params.id)
		.then(() => res.redirect('/coasters/index-coasters'))
		.catch(err => next(err))
});

module.exports = router;