import { apiEndpoint } from '../config'
import { Test } from '../types/Test';
import { CreateTestRequest } from '../types/CreateTestRequest';

export async function getTest(idToken: string): Promise<any> {
  console.log('Fetching test', `${apiEndpoint}/test`)
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

export async function getTests(idToken: string): Promise<any> {
  console.log('Fetching test', `${apiEndpoint}/tests`)
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
      console.log(data);
      return data.items
    });
  return fetchResponse
}

export async function createTest(
  idToken: string,
  newTest: CreateTestRequest
): Promise<Test> {

  const fetchResponse = fetch(`${apiEndpoint}/tests`, {
    method: 'POST', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(newTest)
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

// export async function patchTodo(
//   idToken: string,
//   todoId: string,
//   updatedTodo: UpdateTodoRequest
// ): Promise<void> {
//   await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
// }
