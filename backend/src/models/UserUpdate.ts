import { TestItem } from "./TestItem";

export interface UserUpdate {
  geolocation: object,
  status: string,
  tests: Array<TestItem>
}