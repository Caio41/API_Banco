const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "senha123",
    database: "banco_api"
})




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 

    next();
});

app.post('/cadastro', (req,res) => {
    console.log(req.body)
    const {cpf,nome,nasc} = req.body

    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: "5432",
        password: "senha123",
        database: "banco_api"
    });
    
    client.connect()

    client.query("INSERT INTO usuario VALUES ($1, $2, $3)",[cpf,nome,nasc])
    res.status(201).json({ message: 'Dados inseridos com sucesso.' }); 


    res.json({ success: true, message: "Dados cadastrados com sucesso." });

    client.end()
})

app.get('/', (req,res) => {

    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: "5432",
        password: "senha123",
        database: "banco_api"
    })


    client.connect()

    client.query("SELECT * FROM usuario", (error,ress) => {
    if(!error){
        res.send(JSON.stringify(ress.rows))
    } else {
        console.log(error.message)
    }
    client.end()
})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });