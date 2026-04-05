const postController = require('../controllers/PostController')
const authMiddelware = require("../middleware/auth-middleware")
const express = require("express")


const router = express.Router()


router.post('/create' , postController.create)
router.get('/get' , postController.read)
router.put('/update/:id' , postController.update)
router.delete('/delete/:id' , postController.delete)
router.get('/admin/posts', postController.getAllPost)
router.patch('/admin/posts/:id', postController.updatePost)
router.patch('/like/:id', authMiddelware ,  postController.likePost)
router.get('/user/:id' , authMiddelware , postController.getUserPosts)

module.exports = router
