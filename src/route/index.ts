import { Express } from 'express'
import { v1 } from './v1'
import { routeGraphQL } from './graphql'

const initRoutes = (app:Express)=>{
    app.use('/api/v1', v1())
    routeGraphQL(app)
}
export {initRoutes}