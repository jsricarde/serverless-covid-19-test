import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { UserItem } from '../models/UserItem'
import { UserUpdate } from '../models/UserUpdate'

export class UserAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly usersTable = process.env.USER_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX,
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

  async deleteUser(userId: string) {
    const response = await this.docClient.delete({
      TableName: this.usersTable,
      Key: {
        userId,
      }
    }).promise()

    return response
  }

  async updateUserAddress(userId: string, UserUpdate: UserUpdate): Promise<UserUpdate> {
    const params = {
      TableName: this.usersTable,
      Key: {
        userId,
      },
      UpdateExpression: "set address = :address",
      ExpressionAttributeValues: {
        ":address": UserUpdate.address,
      },
      ReturnValues: "UPDATED_NEW"
    };

    await this.docClient.update(params).promise();
    return UserUpdate
  }

  async getUserById(userId: string): Promise<UserItem> {
    const response = await this.docClient.get({
      TableName: this.usersTable,
      Key: {
        userId,
      }
    }).promise()

    return response.Item as UserItem
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
