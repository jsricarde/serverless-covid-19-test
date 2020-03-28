import { TestItem } from "./TestItem";

export interface UserItem {
  userId: string
  email: string
  createdAt: string
  name: string
  gender: string
  status: string
  phone: string
  geolocation: object,
  tests: Array<TestItem>
}
