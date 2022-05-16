import pool from './pool'

const MySql = {
    query: async (query: string)=>{
        let connectionPool:any = await pool
        let connection:any
        let result:any
        try{
            connection = await connectionPool.getConnection()
            connection.beginTransaction()
            result = await connection.query(query)
            connection.commit()
        }catch(e){
            console.log(e)
            connection.rollback(()=>{})
        }finally{
            connection.release()
            return result
        }
    }
}

export { MySql }
