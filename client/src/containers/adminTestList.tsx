import dateFormat from 'dateformat'
import { History } from 'history'
import * as React from 'react'
import {
  Button,
  Popup,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Table
} from 'semantic-ui-react'

import { getTests, deleteTest } from '../api/tests-api'
import { deleteUser } from '../api/users-api'
import Auth from '../auth/Auth'
import { Test } from '../types/Test'

interface AdminTestListState {
  tests: Test[]
  loadingTests: boolean
}

interface AdminTestListProps {
  auth: Auth
  history: History
}

export class AdminTestList extends React.PureComponent<AdminTestListProps, AdminTestListState> {
  state: AdminTestListState = {
    tests: [],
    loadingTests: true
  }

  onEditButtonClick = (userId: string, testId: string) => {
    this.props.history.push(`/tests/${userId}/edit/${testId}`)
  }

  onEditDateButtonClick = (userId: string, testId: string) => {
    this.props.history.push(`/tests/date/${userId}/edit/${testId}`)
  }

  onTestDelete = async (userId: string) => {
    try {
      await deleteTest(this.props.auth.getIdToken(), userId)
      // await deleteUser(this.props.auth.getIdToken(), userId)
      this.setState({
        tests: this.state.tests.filter(test => test.userId != userId)
      })
    } catch {
      alert('test deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const tests = await getTests(this.props.auth.getIdToken())
      this.setState({
        tests,
        loadingTests: false
      })
    } catch (e) {
      alert(`Failed to fetch tests: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Test Management</Header>

        {this.renderTests()}
      </div>
    )
  }

  renderTests() {
    if (this.state.loadingTests) {
      return this.renderLoading()
    }

    return this.renderTestsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading tests
        </Loader>
      </Grid.Row>
    )
  }

  renderTestsList() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Test Id</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Test Date</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.tests.map((test, pos) => {
            return (
              <Table.Row key={test.userId}>
                <Table.Cell>{test.testId}</Table.Cell>
                <Table.Cell
                  negative={test.statusTest !== 'tested'}
                  positive={test.statusTest === 'tested'}>
                  {test.statusTest}
                </Table.Cell>
                <Table.Cell
                  negative={test.testDate === 'Pending to define'}
                  positive={test.testDate !== 'Pending to define'}
                >
                  {test.testDate}
                </Table.Cell>
                <Table.Cell>
                  {test.resultAttachmentUrl && (
                    <Image src={test.resultAttachmentUrl} size="small" />
                  )}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  <Popup content='Upload a test result' trigger={
                    <Button
                      icon
                      color="blue"
                      onClick={() => this.onEditButtonClick(test.userId, test.testId)}>
                      <Icon name="cloud upload" />
                    </Button>
                  } />
                  <Popup content='Update the test date' trigger={
                    <Button
                      icon
                      color="blue"
                      onClick={() => this.onEditDateButtonClick(test.userId, test.testId)}>
                      <Icon name="calendar" />
                    </Button>
                  } />

                  <Popup content='Delete a test' trigger={
                    <Button
                      icon
                      color="red"
                      onClick={() => this.onTestDelete(test.userId)}>
                      <Icon name="delete" />
                    </Button>
                  } />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table >
    )
  }
}

