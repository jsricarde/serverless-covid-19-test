import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const AWSX = AWSXRay.captureAWS(AWS)

import { UserItem } from '../models/UserItem'
import { UserUpdate } from '../models/UserUpdate'

export class UserAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly usersTable = process.env.USERS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX,
    private readonly bucket = process.env.S3_BUCKET,
    private readonly signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {
  }

  async createUser(UserItem: UserItem): Promise<UserItem> {
    await this.docClient
      .put({
        TableName: this.usersTable,
        Item: UserItem
      })
      .promise()

    return UserItem
  }

  async getUsers(userId: string): Promise<UserItem[]> {
    const result = await this.docClient.query({
      TableName: this.usersTable,
      IndexName: this.userIdIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items;
    return items as UserItem[]
  }

  async deleteUser(UserId: string, userId: string) {
    const response = await this.docClient.delete({
      TableName: this.usersTable,
      Key: {
        userId,
        UserId
      }
    }).promise()

    return response
  }

  async updateUser(UserId: string, userId: string, UserUpdate: UserUpdate): Promise<UserUpdate> {
    const params = {
      TableName: this.usersTable,
      Key: {
        UserId,
        userId,
      },
      UpdateExpression: "set name = :name, dueDate = :dueDate , done = :done",
      ExpressionAttributeValues: {
        ":name": UserUpdate.name,
        ":dueDate": UserUpdate.dueDate,
        ":done": UserUpdate.done
      },
      ReturnValues: "UPDATED_NEW"
    };

    await this.docClient.update(params).promise();
    return UserUpdate
  }

  async getUserById(UserId: string, userId: string): Promise<UserItem> {
    const response = await this.docClient.get({
      TableName: this.usersTable,
      Key: {
        UserId,
        userId
      }
    }).promise()

    return response.Item as UserItem
  }


  getUploadUrl(UserId: string) {
    const s3 = new AWSX.S3({ signatureVersion: 'v4' })

    return s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: UserId,
      Expires: this.signedUrlExpiration
    })
  }

  async updateUrl(UserId: string, userId: string, url: string) {
    return await this.docClient.update({
      TableName: this.usersTable,
      Key: {
        UserId,
        userId
      },
      UpdateExpression: 'set attachmentUrl = :uploadUrl',
      ExpressionAttributeValues: {
        ':uploadUrl': url
      },
      ReturnValues: "UPDATED_NEW"
    })
      .promise()
  }

}

