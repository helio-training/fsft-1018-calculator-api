const { json, send } = require('micro')
const { router, post, get } = require('microrouter')

const cors = require('micro-cors')()
const Joi = require('joi')
const validation = require('micro-joi')


// {
//   values: [1,3]
//   operation: 'addition'
// }
const schema = Joi.object({
  values: Joi.array()
             .items(Joi.number().integer())
             .required()
             .label('Values')
             .error(() => 'Values must be an array of integers'),
  operation: Joi.string()
                .required()
                .valid('addition', 'subtraction', 'division', 'multiplication')
                .default('addition')
                .label('Operation')
                .error(() => 'Operation must be a valid operation'),
})
const validator = validation(schema)

const postHandler = validator(async (req, res) => {
  const body = await json(req)
  
  if (body.operation.toLowerCase() === 'addition') {
    const result = [...body.values].reduce((prev, current) => prev + current, 0)
    return send(res, 200, result)
  }
  
  if (body.operation.toLowerCase() === 'subtraction') {
    const result = [...body.values].reduce((prev, current) => prev + current, 0)
    return send(res, 200, result)
  }
  
  if (body.operation.toLowerCase() === 'multiplication') {
    const result = [...body.values].reduce((prev, current) => prev + current, 0)
    return send(res, 200, result)
  }
  
  // if (body.operation.toLowerCase() === 'division') {
  //   const result = [...body.values].reduce((prev, current) => prev + current, 0)
  //   return send(res, 200, result)
  // }
  
  
  return send(res, 500, { message: 'Unknown operation' })
})

module.exports = cors(router(
  get('/', (req, res) => `Calculator API doesn't support GET Requests`),
  post('/', postHandler),
  get('/*', (req, res) => send(res, 404, 'Not found.')),
))


// module.exports = async (req, res) => {
//   const body = await json(req)
//   console.log(body)
//
//   // Validation
//   if (!body.values)
//     return send(res, 400, { message: 'Values not present in the body' })
//   if (!body.operation)
//     return send(res, 400, { message: 'Operation not present in the body' })
//
//   if (body.operation.toLowerCase() === 'addition') {
//     const result = [...body.values].reduce((prev, current) => prev + current, 0)
//     return send(res, 200, result)
//   }
//
//   return []
// }
