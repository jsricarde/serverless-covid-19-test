import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { getTests, deleteTest } from '../api/tests-api'
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
        <Header as="h1">tests</Header>

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
      <Grid padded>
        {this.state.tests.map((test, pos) => {
          return (
            <Grid.Row key={test.userId}>
              <Grid.Column width={10} verticalAlign="middle">
                {test.testId}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {test.status}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(test.userId, test.testId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onTestDelete(test.userId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {test.resultAttachmentUrl && (
                <Image src={test.resultAttachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}

