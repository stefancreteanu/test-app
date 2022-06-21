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
            type: DataTypes.JSON,
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
    let id = 0;
    const person = req.body;
    try {
        if(person.nume !== '' && person.prenume !== '' && person.cnp !== '' && person.masina !== '') {
            id += 1;
            await sequelize.sync();
            Persoana.create({
                nume: person.nume,
                prenume: person.prenume,
                cnp: person.cnp,
                varsta: person.varsta,
                masina: person.masina,
                customid: id
            })
            res.json('Persoana a fost adaugata');
        }
    } catch (error) {
        console.log(error);
    }
})

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

app.get('/masina', async (req, res) => {
    try {
        const masina = await Masina.findAll();
        res.send(masina);
    } catch (error) {
        console.log(error);
    }
})

app.post('/delcar', async (req, res) => {
    const carId = req.body
    console.log(carId.id);
    try {
        Masina.destroy({
            where: {
                id: carId.id
            }
        })
    } catch (error) {
        console.log(error);
    }
})

server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})