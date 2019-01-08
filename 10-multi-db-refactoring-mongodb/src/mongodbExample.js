const Mongoose = require('mongoose')
Mongoose.connect('mongodb://vitorhenckel:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true }, function (error) {
    if (!error) return ;
    console.log('Falha na conexão!')
})

const connection = Mongoose.connection 

connection.once('open', () => console.log('Database rodando!'))

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('resultCadastrar: ', resultCadastrar)

    const listItens = await model.find()
    console.log('Items: ', listItens)
}
main()