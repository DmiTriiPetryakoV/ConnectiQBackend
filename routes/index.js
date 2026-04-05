const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const routerPost = require('./post-routes')
const AuthController = require('../controllers/AuthController')

router.use('/posts' , routerPost)


router.post('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});


router.post('/registration' ,AuthController.registration)
router.post('/login' , AuthController.login)
router.post('/logout' , AuthController.logout)
router.get('/activate/:link' , AuthController.activate)
router.get('/me', authMiddleware, AuthController.getProfile);
router.get('/user/:id', AuthController.getUserById);

module.exports = router