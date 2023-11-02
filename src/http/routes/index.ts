import { FastifyInstance } from 'fastify'
import { registerPost } from '@/http/controllers/posts/register-post'
import { registerUser } from '@/http/controllers/users/register-user'
import { isLoggedUserMiddleware } from '@/http/middlewares/is-logged-user-middleware'
import { loginUser } from '@/http/controllers/users/login-user'
import { getPost } from '@/http/controllers/posts/get-post'
import { getAllPosts } from '@/http/controllers/posts/get-all-posts'
import { updatePost } from '@/http/controllers/posts/update-post'

export async function routes(app: FastifyInstance) {
  app.get('/health', (_, reply) =>
    reply.status(200).send('Application is up and running'),
  )

  // Posts
  app.post('/posts', { preHandler: isLoggedUserMiddleware }, registerPost)
  app.patch(
    '/posts/:postId',
    { preHandler: isLoggedUserMiddleware },
    updatePost,
  )
  app.get('/posts/:postId', getPost)
  app.get('/posts', getAllPosts)

  // Users
  app.post('/users', registerUser)
  app.post('/users/login', loginUser)
}
