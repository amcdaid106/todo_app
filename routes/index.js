var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your To Do List' });
});


// In-memory store

var id = -1;
var items = {};

router.get('/items', function(req, res) {
    var itemsArr = Object.keys(items).map(function(key) {
        return items[key];
    });
    res.json(itemsArr);
});

router.post('/items', function(req, res) {
    var item = req.body;
    id++;
    item.id = id;
    items[id] = item;
    res.json(item);
});

router.get('/items/:id', function(req, res) {
    var id = req.params.id;
    var item = items[id];

    if (item) {
        res.json(item);
    } else {
        res.status(500).send({ error: 'Couldn\'t find item' });
    }
});

router.put('/items/:id', function(req, res) {
    var id = req.params.id;
    var item = items[id];
    var body = req.body;
    var keys = ['item', 'isDone'];

    if (item) {
        keys.forEach(function(key) {
            if (body[key] !== 'undefined') {
                item[key] = body[key];
            }
        });
        res.json(item);
    } else {
        res.status(500).send({ error: 'Couldn\'t find item' });
    }
});

router.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    var item = items[id];

    if (!item) {
        return res.status(500).send({ error: 'Couldn\'t find item' });
    }

    delete items[id];
    res.status(200).send({ success: true });
});

module.exports = router;
