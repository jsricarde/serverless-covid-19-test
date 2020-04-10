import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { TestItem } from '../models/TestItem'
// import { UserUpdate } from '../models/UserUpdate'

export class TestAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly testsTable = process.env.TEST_TABLE,
    private readonly bucket = process.env.S3_BUCKET,
    private readonly signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {
  }

  async createTest(TestItem: TestItem): Promise<TestItem> {
    await this.docClient
      .put({
        TableName: this.testsTable,
        Item: TestItem
      })
      .promise()

    return TestItem
  }

  getUploadUrl(UserId: string) {
    const s3 = new XAWS.S3({ signatureVersion: 'v4' })

    return s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: UserId,
      Expires: this.signedUrlExpiration
    })
  }

  async updateUrl(userId: string, url: string) {
    return await this.docClient.update({
      TableName: this.testsTable,

      Key: {
        userId,
      },
      UpdateExpression: 'set resultAttachmentUrl = :resultAttachmentUrl',
      ExpressionAttributeValues: {
        ':resultAttachmentUrl': url
      },
      ReturnValues: "UPDATED_NEW"
    })
      .promise()
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}
