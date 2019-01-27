const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Henckel@1909'
const HASH = '$2b$04$Fh0XonoO5agDHxVwlQ/m9Or1nkW95yps2RKC0GAakSBzrEJN49btC'
describe('User helper test suite', function () {
    it('Deve gerar um hash a partir de uma senha',async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })
    it('Deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})