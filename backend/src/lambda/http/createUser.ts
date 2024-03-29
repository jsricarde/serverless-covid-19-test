import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateUserRequest } from '../../requests/CreateUserRequest'
import { createLogger } from '../../utils/logger'
import { createUser } from '../../businessLogic/user'


const logger = createLogger('createUser')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newUser: CreateUserRequest = JSON.parse(event.body)
  const userItem = await createUser(newUser, event)

  if (!userItem) {

    const error = 'An internal server error happened when you tried create a user item.'

    logger.error(error)

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 500,
      body: JSON.stringify({ message: error })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      item: { ...newUser }
    })
  }
}
