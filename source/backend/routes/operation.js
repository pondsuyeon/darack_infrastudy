var express = require('express');
var redis = require('redis');
var JSON = require('JSON');
var router = express.Router();
client = redis.createClient({
    host:"redis",
    port:"6379"
});

router.use(function(req, res, next){
    req.cache = client;
    next();
});

router.post('/sum', function(req, res, next) {
    var first = Number(req.body.first);
    var second = Number(req.body.second);
    var key = first+"_"+second;
    var value;
    req.cache.get(key, function(err, data){
        if(err || data === null){
            value = {
                answer: first+second
            }
            req.cache.set(key, JSON.stringify(value), function(err, data){
                if(err){
                    console.log(err);
                    res.send("error"+err);
                }
            });
            value.cached = false;
        }else{
            value = JSON.parse(data);
            value.cached = true;
        }
        res.send(value);
    });
});


// router.get('/sum', function(req,res,next){
//     var a = req.query.a;
//     var b= req.query.b;
//     var key = a+"_"+b;
    
//     req.cache.get(key, function(err, data){
//         if(err){
//             console.log(err);
//             res.send("error"+err);
//             return;
//         }
//         var value = JSON.parse(data);
//         res.json(value);
//     });
// });
module.exports = router;