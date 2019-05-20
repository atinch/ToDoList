const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

router.get('/', auth, (req, res) => {
  const { role, id } = req.user;
  const searchObj = (role === 'super') ? {} : { userId: id };

  Item.find(searchObj)
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    userId: req.user.id
  });

  newItem.save().then(item => res.json(item));
});

router.put('/:id', auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(item => res.json(req.body))
    .catch(err => res.status(404).json({ success: false }));
});

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;
