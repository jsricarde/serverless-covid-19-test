import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserById, updateUrl, getUploadUrl } from '../../businessLogic/user';

const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters

  const todoExists = await getUserById(todoId)

  if (!todoExists) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'The todo item does not exists'
    }
  }

  const uploadUrl = getUploadUrl(todoId)
  const updateTodoImageUrl = await updateUrl(todoId, uploadUrl.split("?")[ 0 ])
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
