const { json, send } = require('micro')

// {
//   values: [],
//   operation: 'add'
// }


module.exports = async (req, res) => {
  const body = await json(req)
  console.log(body)
  
  // Validation
  if(!body.values)
    return send(res, 400, { message: 'Values not present in the body'})
  if(!body.operation)
    return send(res, 400, { message: 'Operation not present in the body'})
  
  if(body.operation.toLowerCase() === 'addition') {
    const result = body.values.reduce((prev, current) => prev + current, 0)
    return send(res, 200, result)
  }
  
  return []
}
