var express = require('express');
var router = express.Router();

router.post('/sum', function(req, res, next) {
    var first = Number(req.body.first);
    var second = Number(req.body.second);

    res.json({
        answer: first+second
    });
});

module.exports = router;
