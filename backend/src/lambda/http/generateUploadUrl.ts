import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserById } from '../../businessLogic/user';
import { getUploadUrl, updateUrl } from '../../businessLogic/test';
import { getUserId } from '../../lambda/utils'

const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { testId } = event.pathParameters
  const userId = getUserId(event)

  const testExists = await getUserById(userId)

  if (!testExists) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'The test item does not exists'
    }
  }

  const uploadUrl = getUploadUrl(testId)
  const updateTodoImageUrl = await updateUrl(testId, uploadUrl.split("?")[ 0 ])
  logger.info(updateTodoImageUrl)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ uploadUrl: uploadUrl })
  }
}
