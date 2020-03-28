import * as uuid from 'uuid'

import { UserItem } from '../models/UserItem'
import { UserUpdate } from '../models/UserUpdate'
import { UserAccess } from '../dataLayer/userAccess'
import { CreateUserRequest } from '../requests/CreateUserRequest'
import { UpdateUserRequest } from '../requests/UpdateUserRequest'
import { getUserId } from '../lambda/utils'

const userAccess = new UserAccess()

export async function getUsers(event: any): Promise<UserItem[]> {
  const userId = getUserId(event)
  return userAccess.getUsers(userId)
}

export async function createUser(
  newUser: CreateUserRequest,
  event: any
): Promise<UserItem> {

  const todoId = uuid.v4()
  const userId = getUserId(event)

  return await userAccess.createUser({
    userId,
    todoId,
    createdAt: (new Date()).toISOString(),
    done: false,
    ...newUser
  })
}

export async function updateUser(event: any): Promise<UserUpdate> {

  const { UserId } = event.pathParameters
  const UserUpdate: UpdateUserRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  return await userAccess.updateUser(UserId, userId, UserUpdate)
}

export async function deleteUser(event: any) {
  const { UserId } = event.pathParameters
  const userId = getUserId(event)

  return await userAccess.deleteUser(UserId, userId)
}

export async function getUserById(UserId: string, event: any) {
  const userId = getUserId(event)

  const response = await userAccess.getUserById(UserId, userId)

  return response
}

export function getUploadUrl(UserId: string) {
  return userAccess.getUploadUrl(UserId)
}

export async function updateUrl(UserId: string, event: any, url: string) {
  const userId = getUserId(event)

  return await userAccess.updateUrl(UserId, userId, url)
}
