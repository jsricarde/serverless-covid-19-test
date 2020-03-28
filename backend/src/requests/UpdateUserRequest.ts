import { TestItem } from "../models/TestItem";

/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateUserRequest {
  status: string
  geolocation: object
  tests: Array<TestItem>
}