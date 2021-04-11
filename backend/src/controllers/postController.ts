import { Request, Response } from 'express'
import Post from '../models/postModel'

const getAllPosts = async (req: Request, res: Response) => {
  const query = {}

  try {
    const posts = await Post.find(query)

    res.send(posts)
  } catch (error) {
    res.send(error)
  }
}

const getPost = async ({ params: { id } }: Request, res: Response) => {
  try {
    const post = await Post.findOne({ id })

    res.send(post)
  } catch (error) {
    res.send(error)
  }
}

const createPost = async ({ body: { postToCreate } }: Request, res: Response) => {
  try {
    const createdPost = await Post.create(postToCreate)

    res.send(createdPost)
  } catch (error) {
    res.send(error)
  }
}

const updatePost = async ({ body: { postToUpdate }, params: { id } }: Request, res: Response) => {
  try {
    const query = { id }
    const updatedPost = await Post.findOneAndUpdate(query, postToUpdate, { new: true })

    res.send(updatedPost)
  } catch (error) {
    res.send(error)
  }
}

const deletePost = async function ({ params: { id } }: Request, res: Response) {
  try {
    const query = { id }
    await Post.findOneAndDelete(query)

    res.status(204)
    res.send('Deleted')
  } catch (error) {
    res.send(error)
  }
}

export default {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
}
