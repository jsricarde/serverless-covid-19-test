import { apiEndpoint } from '../config'
import { Test } from '../types/Test';
import { CreateTestRequest } from '../types/CreateTestRequest';
import { UpdateTestDateRequest } from '../types/UpdateTestDateRequest';
import Axios from 'axios'

export async function getTest(idToken: string): Promise<any> {
  console.log('Fetching test', `${apiEndpoint}/test`)
  console.log('idToken', idToken)

  const fetchResponse = fetch(`${apiEndpoint}/test`, {
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
  const fetchResponse = fetch(`${apiEndpoint}/tests`, {
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

export async function deleteTest(
  idToken: string,
  userId: string
): Promise<void> {
  const fetchResponse = fetch(`${apiEndpoint}/tests/user/${userId}`, {
    method: 'DELETE', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
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

export async function getUploadUrl(
  idToken: string,
  userId: string,
  testId: string
): Promise<string> {
  const fetchResponse = await fetch(`${apiEndpoint}/tests/${testId}/attachment`, {
    method: 'POST', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({ userId })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data', data);
      return data
    });
  return fetchResponse.resultAttachmentUrl
}

export async function uploadFile(resultAttachmentUrl: string, file: Buffer): Promise<void> {
  await Axios.put(resultAttachmentUrl, file)
}

export async function updateTestDate(
  idToken: string,
  updatedTest: UpdateTestDateRequest
): Promise<Test> {
  const fetchResponse = fetch(`${apiEndpoint}/tests/date`, {
    method: 'PUT', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(updatedTest)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('test updated', data);
      return data
    });
  return fetchResponse
}
