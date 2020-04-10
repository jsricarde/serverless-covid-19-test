// import * as uuid from 'uuid'

import { UserItem } from '../models/UserItem'
import { UserUpdate } from '../models/UserUpdate'
import { UserAccess } from '../dataLayer/userAccess'
import { CreateUserRequest } from '../requests/CreateUserRequest'
import { UpdateUserAddressRequest } from '../requests/UpdateUserAddressRequest'
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

  const status = 'pending'
  return await userAccess.createUser({
    userId,
    createdAt: (new Date()).toISOString(),
    status,
    ...newUser
  })
}

export async function updateUserAddress(event: any): Promise<UserUpdate> {

  const UserUpdate: UpdateUserAddressRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  return await userAccess.updateUserAddress(userId, UserUpdate)
}

export async function deleteUser(event: any) {
  const { userId } = event.pathParameters

  return await userAccess.deleteUser(userId)
}

export async function getUserById(userId: string) {

  const response = await userAccess.getUserById(userId)

  return response
}

