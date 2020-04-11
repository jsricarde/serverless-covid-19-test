import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteUser } from '../../businessLogic/user'
import { deleteTest } from '../../businessLogic/test'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const responseUser = await deleteUser(event)
  const responseTest = await deleteTest(event)

  logger.info(responseUser);
  logger.info(responseTest);

  if (!responseTest) {

    const error = 'An internal server error happened when you tried delete a test item.'

    logger.error(error)

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500,
      body: JSON.stringify({ message: error })
    }
  }

  // TODO: Remove a TODO item by id
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      responseTest
    })
  }
}
