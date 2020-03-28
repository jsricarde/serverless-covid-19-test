import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getTodoById, updateUrl, getUploadUrl } from '../../businessLogic/todo';

const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters

  const todoExists = await getTodoById(todoId, event)

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
  const updateTodoImageUrl = await updateUrl(todoId, event, uploadUrl.split("?")[ 0 ])
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
