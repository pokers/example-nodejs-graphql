import 'graphql-import-node'
import { merge } from 'lodash'
import * as userTypeDefs from './user.graphql'
import * as orderTypeDefs from './ordering.graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { UserResolver, OrderingResolver } from '../resolver/'
import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userTypeDefs, orderTypeDefs],
  resolvers : merge(UserResolver, OrderingResolver),
});

export default schema;