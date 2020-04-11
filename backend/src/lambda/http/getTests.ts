import 'source-map-support/register'
import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getAllTests } from '../../businessLogic/test'

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  const items = await getAllTests()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}
