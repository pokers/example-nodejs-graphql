import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import {initRoutes} from './route'
import { bodyParserGraphQL } from 'body-parser-graphql'
import compression from 'compression'


const app:Express = express()

app.set('port', config.port)

const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParserGraphQL())
app.use(compression())

initRoutes(app)

app.listen(config.port, () =>{
    console.log("Start server...\n")
})

