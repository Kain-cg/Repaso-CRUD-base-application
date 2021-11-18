const router = require("express").Router();
const Park = require('../models/Park.model');


// Render Create Form
router.get("/new-park", (req, res, next) => {
    res.render("parks/new-park");
  });

// create form lands here and redirects to park-list URL
router.post('/create-park', (req, res, next) => {
	Park.create({
		name: req.body.name,
		description: req.body.description,
	})
		.then(() => res.redirect("park-list"))
		.catch(err => next(error))

});

// catches park-list URL and actually renders it
router.get("/park-list", (req, res, next) => {
    res.render("parks/park-list");
  });






module.exports = router;