import express from 'express'
const router = express.Router()
import protect from '../middleware/auth.js'
import postController from '../controllers/post.js'

router.get('/', protect, postController.getPosts)
router.post('/', protect, postController.createPost)
router.put('/', protect, postController.editPost)

router.get('/:id', protect, postController.getPost)
router.delete('/:id', protect, postController.deletePost)

export default router
