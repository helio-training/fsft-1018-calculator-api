const { json, send } = require('micro')
const { router, post } = require('microrouter')

const cors = require('micro-cors')()
const Joi = require('joi')
const validation = require('micro-joi')

const validator = validation(Joi.object({
  values: Joi.array().items(Joi.number().integer()).required().label('Values').error(() => 'Values must be an array of integers'),
  operation: Joi.string().required().valid('addition', 'subtraction', 'division', 'multiplication').default('addition').label('Operation').error(() => 'Operation must be a valid operation'),
}))


module.exports = cors(router(
  post('/', validator(async (req, res) => {
    const body = await json(req)
    
    if (body.operation.toLowerCase() === 'addition') {
      const result = [...body.values].reduce((prev, current) => prev + current, 0)
      return send(res, 200, result)
    }
    
    return []
  })),
))


// {
//   values: 1,
//   operation: 'addition'
// }

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
