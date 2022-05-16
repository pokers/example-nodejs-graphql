import { Request, Response } from "express";
export interface UserProfile {
    name: string,
    age: number
}

export interface Resolver{
    Query: any,
    Mutation: any
}

export interface MySqlConfig{
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GO_MYSQL_URL: string
        DB_RDS_PORT: string
        DB_RDS_USER: string
        DB_RDS_PASS: string
        DB_RDS_DATABASE: string
      }
    }
  }
  