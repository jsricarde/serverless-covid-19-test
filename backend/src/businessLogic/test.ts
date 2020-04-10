import * as uuid from 'uuid'

import { TestItem } from '../models/TestItem'
import { TestAccess } from '../dataLayer/testAccess'
import { CreateTestRequest } from '../requests/CreateTestRequest'
import { getUserId } from '../lambda/utils'

const testAccess = new TestAccess()

export async function createTest(
  newTest: CreateTestRequest,
  event: any
): Promise<TestItem> {
  const testId = uuid.v4()
  const userId = getUserId(event)
  const status = 'pending'
  return await testAccess.createTest({
    testId,
    userId,
    createdAt: newTest.createdAt,
    status,
    testDate: (new Date()).toISOString(),
  })
}

export function getUploadUrl(UserId: string) {
  return testAccess.getUploadUrl(UserId)
}

export async function updateUrl(userId: string, url: string) {
  return await testAccess.updateUrl(userId, url)
}
