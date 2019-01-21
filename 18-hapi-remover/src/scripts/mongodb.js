// Bancos
show dbs

// selecionando um banco
use herois

// mostrar tables (collections)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1982-09-19'
})