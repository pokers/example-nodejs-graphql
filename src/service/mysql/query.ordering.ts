import { MySql } from "./mysql"

const getOrderingByUser = async (userId:number, count: number, startDt: string, orderBy: string) => {
    const numberOfUser = count? count:10
    
    let queryString:string = `SELECT * FROM ordering WHERE user_id=${userId}`
    if(startDt){
        queryString += ` AND start_time > "${startDt}"`
    }
    
    if(orderBy){
        queryString += ` ORDER BY start_time ${orderBy}`
    }

    queryString += ` LIMIT ${count}`
    console.log('Query : ', queryString)
    const result = await MySql.query(queryString)
    return result
}

export const OrderingQuerySet = {
    getOrderingByUser,
}