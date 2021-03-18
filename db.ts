import {Pool} from 'pg'

export const pool = new Pool({
    user: 'postgres',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'emptracking'
})
