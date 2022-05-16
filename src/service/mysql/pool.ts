import mysql from 'promise-mysql';
import { MySql } from '../../config';

export default mysql.createPool(MySql);