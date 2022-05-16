import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from '../../gqlschema'

const routeGraphQL = async (app: Express)=>{
    const apolloServer = new ApolloServer({
        schema,
        introspection: true,
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({
        app,
        path: "/api/graphql"
    })
}

export {routeGraphQL}