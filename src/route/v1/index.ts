import { Router } from 'express'
import { UserRouter } from './userRouter'

const v1 = ():Router => {
    const router = Router()
    UserRouter(router)

    return router
}

export { v1 }