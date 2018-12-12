const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout( () => {
            return resolve( {
                id: 1,
                nome: 'Vitor Henckel',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout( () => {
            return resolve( {
                telefone: '991522008',
                ddd: '51'
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout( () => {
        return callback(null, {
            rua: 'Rua Jorge Mussi',
            numero: '363'
        })
    }, 2000)
}

async function main () {
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: ${telefone.ddd}-${telefone.telefone}
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise');
    } catch (error) {
        console.error('Deu erro: ', error)
    }
}

main()

// const usuarioPromise = obterUsuario()

// usuarioPromise
//     .then((usuario) => {
//         return obterTelefone(usuario.id)
//         .then(function resolverTelefone(result) {
//             return {
//                 usuario: {
//                 nome: usuario.nome,
//                 id: usuario.id
//             },
//                 telefone: result
//             }
//         })
//     })
//     .then((resultado) => {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then((resultado) => {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: ${resultado.telefone.ddd}-${resultado.telefone.telefone}
//         `);
//     })
//     .catch((error) => {
//     console.log('Deu ruim!', error);
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.log('Deu ruim!')
//     return
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.log('Deu ruim no telefone!')
//       return
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.log('Deu ruim no telefone!')
//         return
//       }
//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua}, ${endereco.numero},
//         Telefone: ${telefone.ddd}-${telefone.telefone}    
//       `)
//     })
//   })
// })

