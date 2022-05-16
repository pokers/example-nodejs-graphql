import {Request, Response} from 'express'
import { UserQuerySet } from '../../service/mysql'

const getUserList = async (req:Request, res:Response) => {
    try{
        const result = await UserQuerySet.getUserList(10, 225)
        console.log('Query result : ', result)

        res.status(200).send({
            success: true,
            data: result
        })
    }catch(e){
        console.error(e)
        res.status(500).send({message : 'Failed to get user list'})
    }
}

const getUser = async (req:Request, res:Response)=>{
    try{
        const userId:number = parseInt(req.params.id)
        const result = await UserQuerySet.getUser(userId)
        console.log('Query result : ', result)

        res.status(200).send({
            success: true,
            data: result[0]
        })
    }catch(e){
        console.error(e)
        res.status(500).send({message : 'Failed to get user'})
    }
}

const postUser = async (req:Request, res:Response)=>{
    try{
        res.status(201).send({message: "success"})
    }catch(e){
        console.error(e)
        res.status(500).send({message : 'Failed to get user'})
    }
}



export const UserController = {
    getUserList,
    getUser,
    postUser,
}