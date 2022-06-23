const express = require('express');
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
        
app.use(cookieparser());
app.use(bodyparser.json());
app.use(cors());

const sequelize = new Sequelize('testapp', 'postgres', 'postpassgresword1427', {
    host: '127.0.0.1',
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log('Database connected');
})

class Persoana extends Model {}
class Masina extends Model {}

Persoana.init(
    {
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnp: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        varsta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        masina: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customid: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'persoana',
        tableName: 'persoane'
    }
)

Masina.init(
    {
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anfab: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capcil: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        taxa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customid: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'masina',
        tableName: 'masini'
    }
)

app.post('/persoane', async (req, res) => {
    const person = req.body;
    console.log(person);
    try {
        await sequelize.sync();
        Persoana.create({
            nume: person.nume,
            prenume: person.prenume,
            cnp: person.cnp,
            varsta: person.varsta,
            masina: person.masina,
        })
        res.json('Persoana a fost adaugata');
    } catch (error) {
        console.log(error);
    }
})

app.get('/persoane', async (req, res) => {
    try {
        const persoana = await Persoana.findAll();
        res.send(persoana);
    } catch (error) {
        console.log(error);
    }
})


//POST CAR REQUEST
app.post('/masina', async (req, res) => {
    const masina = req.body;
    console.log(masina);
    try {
        if(masina.marca !== '' && masina.model !== '' && masina.anfab !== '' && masina.capcil !== '' && masina.taxa !== '') {
            await sequelize.sync();
            Masina.create({
                marca: masina.marca,
                model: masina.model,
                anfab: masina.anfab,
                capcil: masina.capcil,
                taxa: masina.taxa,
            })
            res.json('Masina a fost adaugata');
        }
    } catch (error) {
        console.log(error);
    }
})


//GET ALL CARS REQUEST
app.get('/masina', async (req, res) => {
    try {
        const masina = await Masina.findAll();
        res.send(masina);
    } catch (error) {
        console.log(error);
    }
})

//DELETE CAR REQUEST
app.delete('/delcar/:id', async (req, res) => {
    const carId = req.params.id;
    try {
        await Masina.destroy({
            where: {
                id: carId
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//GET 1 CAR REQUEST
app.get('/getcar/:id', async (req, res) => {
    try {
        const masina = await Masina.findOne({
            where: {
                id: req.params.id
            }
        })
        res.send(masina);
    } catch (error) {
        console.log(error);
    }
})

//UPDATE CAR REQUEST

app.put('/updatecar', async (req, res) => {
    try {
        await Masina.update(req.body, {
            where: {
                id: req.body.id
            }
        })
    } catch (error) {
        console.log(err);
    }
})

server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})