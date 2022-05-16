import { MySqlConfig } from "../types"
const config = {
    port: 8080
}
export default config

export const MySql:MySqlConfig = {
    host: process.env.GO_MYSQL_URL,
    port: Number(process.env.DB_RDS_PORT),
    user: process.env.DB_RDS_USER,
    password: process.env.DB_RDS_PASS,
    database: process.env.DB_RDS_DATABASE,
}