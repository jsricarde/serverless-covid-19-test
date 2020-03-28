/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateUserRequest {
  name: string
  dueDate: string
  done: boolean
}