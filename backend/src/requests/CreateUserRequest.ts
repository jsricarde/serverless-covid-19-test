/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateUserRequest {
  name: string,
  email: string,
  gender: string,
  phone: string,
  geolocation: object,
}
