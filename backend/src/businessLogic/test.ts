import * as uuid from 'uuid'

import { TestItem } from '../models/TestItem'
import { TestAccess } from '../dataLayer/testAccess'
import { CreateTestRequest } from '../requests/CreateTestRequest'
import { UpdateTestDateRequest } from '../requests/UpdateTestDateRequest'
import { getUserId } from '../lambda/utils'

const testAccess = new TestAccess()

export async function createTest(
  newTest: CreateTestRequest,
  event: any
): Promise<TestItem> {
  const testId = uuid.v4()
  const userId = getUserId(event)
  const statusTest = 'pending'
  return await testAccess.createTest({
    testId,
    userId,
    createdAt: newTest.createdAt,
    statusTest,
    testDate: 'Pending to define',
  })
}

export async function getAllTests(): Promise<TestItem[]> {
  return testAccess.getAllTests()
}

export async function deleteTest(event: any) {
  const { userId } = event.pathParameters

  return await testAccess.deleteTest(userId)
}

export function getUploadUrl(testId: string) {
  return testAccess.getUploadUrl(testId)
}

export async function updateUrl(testId: string, userId: string, url: string) {
  return await testAccess.updateUrl(testId, userId, url)
}


export async function updateDate(event: any): Promise<any> {
  const testUpdate: UpdateTestDateRequest = JSON.parse(event.body)
  const { testId, userId, testDate } = testUpdate
  return await testAccess.updateDate(testId, userId, testDate)
}