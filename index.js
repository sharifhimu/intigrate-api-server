const express = require('express')
const cors = require('cors')
const app = express();
const pool = require("./db")

app.use(cors())
app.use( express.json() );

app.post("/register", async (req, res) => {
    try{
        const { email, fullname, dob, profession, password } = req.body
        const reg = await pool.query("INSERT INTO api (email,fullname,dob,profession, password) VALUES($1,$2,$3,$4, $5) RETURNING *", [email,fullname,dob,profession, password]);

        res.json(reg.rows[0])
    }catch(err){
        console.error(err.message);
    }
})

app.get("/all", async (req, res) => {
    try{
        const all = await pool.query("SELECT * FROM api")
        res.json(all.rows)

    }catch(err){
        console.error(err.message)
    }
})

app.get("/all/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const singlepenny = await pool.query("SELECT * FROM api WHERE fullname = $1", [id] )
        res.json( singlepenny.rows[0] )

    }catch(err){
        console.error(err.message);
    }
})

app.put("/all/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const { email, fullname, dob, profession } = req.body
        if(!fullname && !dob && !profession){
            const updatepenny = await pool.query("UPDATE api SET email = $1 WHERE id = $2", [email, id])
        }
        else if(!dob && !profession){
            const updatepenny = await pool.query("UPDATE api SET email = $1, fullname = $2 WHERE id = $3", [email, fullname,id])
        }
        else if(!profession){
            const updatepenny = await pool.query("UPDATE api SET email = $1, fullname = $2, dob = $3 WHERE id = $4", [email, fullname, dob, id])
        }
        else{
            const updatepenny = await pool.query("UPDATE api SET email = $1, fullname = $2, dob = $3, profession = $4 WHERE id = $5", [email, fullname, dob, profession, id])
        }

        res.json('updated');

    }catch(err){
        console.error(err.message);
    }
})

app.delete("/all/:id", async (req, res) => {
    try{
        const { id  } = req.params
        const deletepenny = await pool.query("DELETE FROM api WHERE id = $1", [id] )
        res.json("deleted")

    }catch(err){
        console.error(err.message);
    }
})

app.listen(8000, () => {
    console.log('server has started on port 8000');
})