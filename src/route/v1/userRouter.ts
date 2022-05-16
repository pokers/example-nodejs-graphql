import { Router } from 'express'
import { UserController } from '../../controller'

const UserRouter = (root:Router)=>{
    const router = Router()
    root.use('/user', router)

    router.get('/', UserController.getUserList)
    router.get('/:id', UserController.getUser)
    router.post('/', UserController.postUser)
}

export { UserRouter }