import React from 'react'
import { History } from 'history'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { getTest } from '../api/tests-api'

import Auth from '../auth/Auth'

interface testUserState {
  createdAt: string
  testId: string
  resultAttachmentUrl: string
  status: string
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
    status: '',
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
    const { status, testDate, resultAttachmentUrl, isTestExist } = this.state
    const { address } = this.props
    return (isTestExist && (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <p>Test Date</p>
          </Grid.Column>
          <Grid.Column width={3}>
            <p>Address</p>
          </Grid.Column>
          <Grid.Column width={3}>
            <p>Status</p>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>Result</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            {testDate}
          </Grid.Column>
          <Grid.Column width={3}>
            {address}
            <Button
              icon
              color="blue"
              onClick={() => this.onEditAddressButtonClick()}
            >
              <Icon name="pencil" />
            </Button>
          </Grid.Column>
          <Grid.Column width={3}>
            {status}
          </Grid.Column>
          <Grid.Column width={7}>
            {resultAttachmentUrl && (
              <Image src={resultAttachmentUrl} size="small" wrapped />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ))
  }

}
