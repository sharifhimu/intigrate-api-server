const Pool = require("pg").Pool;


const pool = new Pool({
    user: "postgres",
    password: 'ROchond',
    host: "localhost",
    port: 5432,
    database: 'evatix'
})

module.exports = pool;