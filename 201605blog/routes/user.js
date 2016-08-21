var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('content-type','text/html;charset=utf-8');
  res.send('respond with a resource');
});
//这里的路径并不是完整的路径，设置的路径前面都有隐藏的users
//注册
router.get('/reg', function(req, res, next) {
  res.setHeader('content-type','text/html;charset=utf-8');
  res.render('user/reg');
});
//登录
router.get('/login', function(req, res, next) {
  res.setHeader('content-type','text/html;charset=utf-8');
  res.render('user/login');
});
router.get('/logout', function(req, res, next) {
  res.setHeader('content-type','text/html;charset=utf-8');
  res.send('退出');
});

module.exports = router;

