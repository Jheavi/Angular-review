import postController from '../controllers/postController'
const { Router } = require('express')

function postRouter () {
  const router = Router()

  router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost)

  router.route('/:id')
    .get(postController.getPost)
    .put(postController.updatePost)
    .delete(postController.deletePost)

  return router
}

module.exports = postRouter()
