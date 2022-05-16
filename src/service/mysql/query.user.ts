import { MySql } from "./mysql"

const getUserList = async (count: number, offset: number) => {
    const numberOfUser = count? count:1
    const pageOffset = offset? offset: 0
    
    const queryString:string = `SELECT * FROM user LIMIT ${numberOfUser} OFFSET ${pageOffset}`
    console.log('Query : ', queryString)
    const result = await MySql.query(queryString)
    return result
}

const getUser = async (userId:number) => {
    const queryString:string = `SELECT * FROM user WHERE id=${userId}`
    const result:any = await MySql.query(queryString)
    return result
}

export const UserQuerySet = {
    getUserList,
    getUser,
}