/* 1 objetivo: obter um usuario
   2 objetivo: obter o numero do telefone do usuario a partir do Id 
   3 objetivo: obter o endereço do usuario pelo Id*/ 

function getUser(callback) {
   setTimeout(() => {
      return callback(null, {
        id: 10,
        name: 'guilherme',
        date_of_birth: new Date()
        })
   }, 1000)
}

function getTelephone(usuarioid, callback) {
    setTimeout(() => {
        return callback(null, {
            telephone: 856845712,
            ddd: 85
            })
    }, 2000)
}

getUser(function resolveUser (error, user) {
    if (error) {
        console.log("User Error!", error)
    }else {
        console.log('User', user)
    }
})

getTelephone(user.id, function resolveTelephone (error, telephone) { 
    if (error) {
        console.log("Telephone Error!", error)
    }else {
        console.log('Telephone', telephone)  
    }
})