import React from 'react'
import { History } from 'history'
import { Table, Image, Button, Icon, Popup } from 'semantic-ui-react'
import { getTest } from '../api/tests-api'

import Auth from '../auth/Auth'

interface testUserState {
  createdAt: string
  testId: string
  resultAttachmentUrl: string
  statusTest: string
  testDate: string
  isTestExist: boolean
}

interface TestUserProps {
  auth: Auth,
  address: string
  history: History
}

export class UserTestList extends React.PureComponent<TestUserProps, testUserState> {
  state: testUserState = {
    createdAt: '',
    testId: '',
    resultAttachmentUrl: '',
    statusTest: '',
    testDate: '',
    isTestExist: false
  }

  onEditAddressButtonClick = () => {
    this.props.history.push('/user/address/edit')
  }

  async componentDidMount() {
    try {
      const test = await getTest(this.props.auth.getIdToken())
      if ('createdAt' in test) {
        this.setState({
          ...test,
          isTestExist: true
        })
      }

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }
  render() {
    const { statusTest, testDate, resultAttachmentUrl, isTestExist } = this.state
    const { address } = this.props
    return (isTestExist && (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Test Date</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row >
            <Table.Cell
              negative={statusTest !== 'tested'}
              positive={statusTest === 'tested'}>
              {statusTest}
            </Table.Cell>
            <Table.Cell
              negative={testDate === 'Pending to define'}
              positive={testDate !== 'Pending to define'}
            >
              {testDate}
            </Table.Cell>
            <Table.Cell>
              {address}
            </Table.Cell>
            <Table.Cell>
              {resultAttachmentUrl && (
                <Image
                  src={resultAttachmentUrl}
                  size="medium" />
              )}
            </Table.Cell>
            <Table.Cell textAlign='center'>

              <Popup content='Update the user address' trigger={
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditAddressButtonClick()}>
                  <Icon name="address card" />
                </Button>
              } />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table >
    ))
  }

}
