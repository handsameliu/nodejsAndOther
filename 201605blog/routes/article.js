var express = require('express');
var router = express.Router();

//发表文章
router.get('/add', function(req, res, next) {
    res.setHeader('content-type','text/html;charset=utf-8');
    res.render('article/add');
});
module.exports = router;
