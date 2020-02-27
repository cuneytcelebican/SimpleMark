var express = require('express');
var router = express.Router();
var MarkingSchema = require('../models/marking');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addMarkingSchema', { title: 'Add marking schema' });
});

router.get('/sample', function(req, res, next) {
  res.render('sample', { title: 'Express' });
});

router.get('/add-marking-schema', function(req, res, next) {
  res.render('addMarkingSchema', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
  let markingSchemaId = req.params.id;
  MarkingSchema.getMarkingById(markingSchemaId, function(e, item)
  {
    if (e)
    {
      console.log(`Failed on router.get('/${markingSchemaId}')\nError:`.error, e.message.error + "\n")
      e.status = 404; next(e);
    }
    else
    {
      res.render('markingPage', { title: "Marking Schema", schema: item.marking});
    }
  });
});

router.post('/add-marking-schema', function(req, res, next) {
  if (req.body && req.body.message)
  {
    let mSchema = new MarkingSchema({
      marking: req.body.message,
    });
    mSchema.save();
    res.end(mSchema.id);
  }
  else
  {
    res.end("")
  }
});

module.exports = router;
