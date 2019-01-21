const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (req, res, erro) => {
    throw erro
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query 
                    const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {}
                    
                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Error: ', error)
                    return 'Internal Error!'
                }
                
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('Error: ', error)
                    return 'Internal Error!'
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const { payload } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)
                    if(result.nModified !== 1) return {
                        message: 'Não foi possível atualizar'
                    }
                    return {
                        message: 'Heroi atualizado com sucesso'
                    }
                } catch (error) {
                    console.log('Error: ', error)
                    return 'Internal Error!'
                }
            }
        }
    }
}

module.exports = HeroRoutes