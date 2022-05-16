
import { GraphQLResolveInfo, ObjectTypeDefinitionNode } from 'graphql'
import { IResolvers } from '@graphql-tools/utils'
import { UserQuerySet, OrderingQuerySet } from '../../service/mysql'


let getDateBefore = (days: number):string=>{
    function pad(n:number) { return n<10 ? "0"+n : n }
    const now = new Date()
    now.setTime(now.getTime() + (9*60*60*1000))
    now.setTime(now.getTime() - (days * 24 * 60*60*1000))
    return now.getFullYear()+"-"+ 
    pad(now.getMonth()+1)+"-"+ 
    pad(now.getDate())+" "+ 
    pad(now.getHours())+":"+ 
    pad(now.getMinutes())+":"+ 
    pad(now.getSeconds())
}

let queryUsers = async (parent:any, args:any, context:any, info:GraphQLResolveInfo) => {
    try{
        // console.log('Params : ', parent, JSON.stringify(args), JSON.stringify(context), JSON.stringify(info))
        console.log('Args : ', JSON.stringify(args))
        const count = (args || ({} as any)).count? args.count:1
        const offset = (args || ({} as any)).offset? args.offset:0
        const result:Array<any> = await UserQuerySet.getUserList(count, offset)
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

let queryUser = async (parent:any, args:any, context:any, info:any)=>{
    try{
        const query = info.fieldNodes.find((field:any) => field.name.value === info.fieldName)
        // const type = info.schema.getType('Ordering').astNode as ObjectTypeDefinitionNode

        // console.log('Params : ', parent, JSON.stringify(args), JSON.stringify(context), JSON.stringify(info))
        // console.log(`Query : ${JSON.stringify(query)}\n Type : ${JSON.stringify(type)}`)
        // console.log('Args : ', JSON.stringify(args))

        const isOrdering = query.selectionSet.selections.filter((field:any)=>{return field.kind === 'Field' && field.name.value === 'ordering'})
        let user:Array<any> = await UserQuerySet.getUser(args.userId)
        if(user.length === 0){
            throw new Error('Could not find user data');
        }

        if(isOrdering){
            const count = (args || ({} as any)).count? args.count:10
            const startDt = (args || ({} as any)).startDt? args.startDt:getDateBefore(7)
            user[0]['ordering'] = await OrderingQuerySet.getOrderingByUser(args.userId, count, startDt, "DESC")
        }
        console.log('User : ', JSON.stringify(user[0]))
        return user[0]
    }catch(e){
        console.log(e)
        throw e
    }
}
const UserResolver:IResolvers = {
    Query: {
        users: queryUsers,
        user: queryUser
    },
    Mutation: {
        addUser: async () => {
            return true
        }
    }
}

export { UserResolver }