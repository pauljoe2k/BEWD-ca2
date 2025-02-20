const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

let users = [
    {email:"test@gmail.com",password:"12345"},
    {email:'test2@gmail.com',password:"12345"}
]

app.get('/',async (req,res) => {
    const {email,password} = req.body;
    if(!email){
        return res.status(400).send({message:"Invalid email"})
    }
    const user = users.find(user => user.email == email);
    if(!user){
        return res.status(400).send({message:"user not found"})
    }
    res.json({message:"User retrieved successfully",user})

});
app.post('/',async (req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send({message:"Invalid credentials"});
    }
    const user = users.find(user=>user.email == email && user.password == password)

        if(!user){
            return res.status(400).send({message:"Invalid credentials"})
        }
        res.json({message:"Authorized successfully "})
});
app.put('/update',async (req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send({message:"Invalid credentials"});
    }
    const user = users.find(user=>user.email == email)
    if(!user){
        return res.status(400).send({message:"Invalid User"});
    }
    user.password = password
    return res.status(200).send({message:"Updated successfully"})
});
app.delete('/delete',async (req,res) => {
    const {email,} = req.body;
    if(!email){
        return res.status(400).send({message:"Invalid email"});
    }
    const index = users.findIndex(user=>user.email === email)
    if(index === -1){
        res.status(404).send({message:"user not found "})
    }
    users.splice(index,1)
    res.status(200).send({message:"Deleted successfully"})
});

app.listen(PORT,()=>{
    console.log(`App listening in http://localhost:${PORT}`)
})