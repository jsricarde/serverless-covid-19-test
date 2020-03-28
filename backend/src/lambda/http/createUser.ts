import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateUserRequest } from '../../requests/CreateUserRequest'
import { createLogger } from '../../utils/logger'
import { createUser } from '../../businessLogic/user'


const logger = createLogger('createUser')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateUserRequest = JSON.parse(event.body)
  const todoItem = await createUser(newTodo, event)

  if (!todoItem) {

    const error = 'An internal server error happened when you tried create a todo item.'

    logger.error(error)

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      statusCode: 500,
      body: JSON.stringify({ message: error })
    }
  }
  const { todoId } = todoItem

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: { ...newTodo, todoId }
    })
  }
}
