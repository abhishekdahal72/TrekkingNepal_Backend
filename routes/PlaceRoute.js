const express = require('express');
const customerAuth = require('../middleware/UserAuth');
const router = express.Router();
const Movie = require('../models/MovieModel');
const upload = require('../middleware/m_image');

//movie inserted 
router.post(
  '/movie/insert',
  upload.single('imagepp'),
  customerAuth.verifyUser,
  customerAuth.verifyAdmin,
  function (req, res) {
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(500).json({ message: 'Invalid image' });
    }
    const title = req.body.title;
    const release_date = req.body.release_date;
    const description = req.body.description;

    const data = new Movie({
      title: title,
      release_date: release_date,
      description: description,
      imagepp: req.file.filename,
    });

    data
      .save()
      .then(function (result) {
        // success
        res.status(200).json({ message: 'Movie inserted successfully' });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ message: error });
      });
  }
);
//end of movie inserted

// Movie deleted
router.delete(
  '/movie/delete/:id', function (req, res) {
    const mid = req.params.id;
    Movie.deleteOne({ _id: mid })
      .then(function (result) {
        res.status(200).json({success:true ,message: 'Movie deleted!!' });
      })
      .catch(function (err) {
        res.status(500).json({success:false, message: err });
      });
  }
);
//end of movie deleted

// Movie update

router.put(
  '/movie/update',
  customerAuth.verifyUser,
  customerAuth.verifyAdmin,
  function (req, res) {
    const title = req.body.title;
    const release_date = req.body.release_date;
    const description = req.body.description;
    const mid = req.body.id;
    Movie.updateOne(
      { _id: mid },
      { title: title, release_date: release_date, description: description }
    )
      .then(function (result) {
        console.log(result);
        res.status(200).json({ message: 'Movie Updated Successfully!!' , data : data});
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ message: e });
      });
  }
);

//end of movie update

router.get('/movie/fetch', function (req, res) {
  Movie.find().then(function (movieData) {
    res
      .status(200)
      .json({ success: true, count: movieData.length, data: movieData });
  });
});

router.get('/movie/single/:id', function (req, res) {
  const id = req.params.id;
  Movie.findOne({ _id: id })
    .then(function (data) {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
