import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUploadUrl, updateUrl } from '../../businessLogic/test';

const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body)
  const { userId } = body

  const { testId } = event.pathParameters

  const resultAttachmentUrl = getUploadUrl(testId)
  const updateTodoImageUrl = await updateUrl(testId, userId, resultAttachmentUrl.split("?")[ 0 ])
  logger.info(updateTodoImageUrl)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ resultAttachmentUrl: resultAttachmentUrl })
  }
}
