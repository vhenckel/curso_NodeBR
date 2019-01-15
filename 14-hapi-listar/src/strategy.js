class NotImplementedException extends Error {
    constructor() {
        super('Not implemented Exception')
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException() 
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Item salvo no MongoDB')
    }
}

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Item salvo no Postgres')
    }
}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item){
        return this._database.update(item)
    }

    delete(id) {
        return this._database.delete(item)
    }
}

const contextMongo = new ContextStrategy(new MongoDB)
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres)
contextPostgres.create()
