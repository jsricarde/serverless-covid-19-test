import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'

const logger = createLogger('testAccess')
const XAWS = AWSXRay.captureAWS(AWS)

import { TestItem } from '../models/TestItem'

export class TestAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly testsTable = process.env.TEST_TABLE,
    private readonly testIdIndex = process.env.TEST_ID_INDEX,
    private readonly bucket = process.env.S3_BUCKET,
  ) {
  }

  async getAllTests(): Promise<TestItem[]> {
    const result = await this.docClient.scan({
      TableName: this.testsTable
    }).promise()

    const items = result.Items
    return items as TestItem[]
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

  async deleteTest(userId: string, testId: string) {
    logger.info(userId)
    logger.info(testId)
    const response = await this.docClient.delete({
      TableName: this.testsTable,
      Key: {
        userId,
        testId
      }
    }).promise()

    return response
  }

  async getTest(userId: string): Promise<TestItem> {
    logger.info(userId)
    const response = await this.docClient.query({
      TableName: this.testsTable,
      IndexName: this.testIdIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    const items = response.Items;
    logger.info(items)

    return items[ 0 ] as TestItem
  }

  getUploadUrl(testId: string) {
    const s3 = new XAWS.S3({ signatureVersion: 'v4' })

    return s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: testId,
      Expires: 90000
    })
  }

  async updateUrl(testId: string, userId: string, url: string) {
    return await this.docClient.update({
      TableName: this.testsTable,
      Key: {
        testId,
        userId,
      },
      UpdateExpression: 'set resultAttachmentUrl = :resultAttachmentUrl, statusTest = :statusTest',
      ExpressionAttributeValues: {
        ':resultAttachmentUrl': url,
        ':statusTest': 'tested'
      },
      ReturnValues: "UPDATED_NEW"
    })
      .promise()
  }


  async updateDate(testId: string, userId: string, testDate: string) {
    return await this.docClient.update({
      TableName: this.testsTable,
      Key: {
        testId,
        userId,
      },
      UpdateExpression: 'set testDate = :testDate',
      ExpressionAttributeValues: {
        ':testDate': testDate
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
