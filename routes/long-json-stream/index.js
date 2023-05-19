const { LongJsonStream } = require('./streams')

module.exports = async function(fastify, opts) {
  fastify.get('/', async function(request, reply) {
    const stream = new LongJsonStream();
    return reply.send(stream)
  })
}
