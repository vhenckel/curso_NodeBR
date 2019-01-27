const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = 'MEU_SEGREDO_1909'

const app = new Hapi.server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    
    const connectionPostgres = await Postgres.connect()
    const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema))

    const swaggerOptions = {
        info: {
            title: 'API Heróis - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }   
    await app.register([
        HapiJwt,
        Vision, 
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: (dado, request) => {
            //verifica no banco de usuário está ativo, etc
            return {
                isValid: true
            }
        }
    })

    app.auth.default('jwt')

    app.route(
        [
            ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
            ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
        ]
    )
    await app.start()
    console.log('Server is on...', app.info.port)
    return app
}
module.exports = main()