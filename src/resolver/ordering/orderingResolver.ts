
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

let queryOrdering = async (parent:any, args:any, context:any, info:GraphQLResolveInfo) => {
    try{
        // console.log('Params : ', parent, JSON.stringify(args), JSON.stringify(context), JSON.stringify(info))
        console.log('Args : ', JSON.stringify(args))
        const count:number = (args || ({} as any)).count? args.count:10
        const startDt:string = (args || ({} as any)).startDt? args.startDt:getDateBefore(10)
        const result:Array<any> = await OrderingQuerySet.getOrderingByUser(args.userId, count, startDt, "DESC")
        return result
    }catch(e){
        console.log(e)
        throw e
    }
}

const OrderingResolver:IResolvers = {
    Query: {
        ordering: queryOrdering
    }
}

export { OrderingResolver }