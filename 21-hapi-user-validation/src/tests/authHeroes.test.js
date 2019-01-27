const assert = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/contextStrategy')
const PostGres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
    username: 'Henckel',
    password: '$2b$04$Fh0XonoO5agDHxVwlQ/m9Or1nkW95yps2RKC0GAakSBzrEJN49btC'
}
const USER_DB = {
    ...USER,
    password: ''
}
describe.only('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api
        const connectionPostgres = await PostGres.connect()
        const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        const result = await model.update(null, USER_DB, true)
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})