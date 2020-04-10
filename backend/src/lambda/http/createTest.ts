import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTestRequest } from '../../requests/CreateTestRequest'
import { createLogger } from '../../utils/logger'
import { createTest } from '../../businessLogic/test'


const logger = createLogger('createUser')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTest: CreateTestRequest = JSON.parse(event.body)
  const testItem = await createTest(newTest, event)

  if (!testItem) {

    const error = 'An internal server error happened when you tried create a test item.'

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
      item: { ...testItem }
    })
  }
}
