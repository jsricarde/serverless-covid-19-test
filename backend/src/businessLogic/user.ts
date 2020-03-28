// import * as uuid from 'uuid'

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

  const userId = getUserId(event)

  return await userAccess.createUser({
    userId,
    createdAt: (new Date()).toISOString(),
    status: 'pending',
    tests: [],
    ...newUser
  })
}

export async function updateUser(event: any): Promise<UserUpdate> {

  const UserUpdate: UpdateUserRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  return await userAccess.updateUser(userId, UserUpdate)
}

export async function deleteUser(event: any) {
  const { userId } = event.pathParameters

  return await userAccess.deleteUser(userId)
}

export async function getUserById(userId: string) {

  const response = await userAccess.getUserById(userId)

  return response
}

export function getUploadUrl(UserId: string) {
  return userAccess.getUploadUrl(UserId)
}

export async function updateUrl(userId: string, url: string) {

  return await userAccess.updateUrl(userId, url)
}
