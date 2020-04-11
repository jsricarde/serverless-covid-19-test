import { apiEndpoint } from '../config'
import { Test } from '../types/Test';
import { CreateUserRequest } from '../types/CreateUserRequest';
import { UpdateUserAddressRequest } from '../types/UpdateUserAddressRequest';

export async function getUser(idToken: string): Promise<any> {
  console.log('idToken', idToken)

  const fetchResponse = fetch(`${apiEndpoint}/user`, {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data
    });
  return fetchResponse
}

export async function getUsers(idToken: string): Promise<any> {
  console.log('Fetching test', `${apiEndpoint}/users`)
  console.log('idToken', idToken)

  const fetchResponse = fetch(`${apiEndpoint}/users`, {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('get users', data);
      return data.items
    });
  return fetchResponse
}

export async function createUser(
  idToken: string,
  newUser: CreateUserRequest
): Promise<Test> {
  const fetchResponse = fetch(`${apiEndpoint}/users`, {
    method: 'POST', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(newUser)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('user created', data);
      return data
    });
  return fetchResponse
}

export async function updateUserAddress(
  idToken: string,
  updatedUser: UpdateUserAddressRequest
): Promise<Test> {
  const fetchResponse = fetch(`${apiEndpoint}/users/address`, {
    method: 'PUT', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(updatedUser)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('user updated', data);
      return data
    });
  return fetchResponse
}
