const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const Jwt = require('jsonwebtoken')
const PasswordHelper = require('./../helpers/passwordHelper')

const failAction = (req, res, erro) => {
    throw erro
}
const USER = {
    username: 'henckel',
    password: '123'
}
class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
    }
    login() {

        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com user e senha do banco',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload
                const [usuario] = this.db.read({
                    username: username.loLowerCase()
                })
                if (!usuario) {
                    return Boom.unauthorized('O usuário informado não existe!')
                }
                const match = await PasswordHelper.comparePassword(password, usuario.password)
                if (!match) {
                    return Boom.unauthorized('O usuário ou senha inválido')
                }

                // if (username.toLowerCase() !== USER.username || 
                //     password !== USER.password) 
                //     return Boom.unauthorized()
                
                const token = Jwt.sign({
                    username:username,
                    id: usuario.id
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes