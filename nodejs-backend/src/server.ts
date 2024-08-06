import fastify from "fastify";

const app = fastify()

app.get('/teste', () => {
    return 'Hello, world!'
})

app.listen({port: 3333}).then((address) => {
    console.log(`🚀 A giripoca está piando em: \x1b[32m${address}`)
})