import * as React from 'react'
import { History } from 'history'
import {
  Button,
  Grid,
  Input,
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { updateTestDate } from '../api/tests-api'

interface AdminEditTestDateProps {
  match: {
    params: {
      userId: string
      testId: string
    }
  }
  auth: Auth
  history: History
}

interface AdminEditTestDateState {
  testDate: string
}

export class AdminEditTestDate extends React.PureComponent<
  AdminEditTestDateProps,
  AdminEditTestDateState
  > {
  state: AdminEditTestDateState = {
    testDate: '',
  }

  handleTestDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ testDate: event.target.value })
  }


  onUpdateAddress = async () => {
    try {
      const { testDate } = this.state
      const { userId, testId } = this.props.match.params
      const updatedUser = await updateTestDate(this.props.auth.getIdToken(), { testDate, userId, testId })
      alert('The Test Date was updated!')
      this.props.history.push('/admin')
    } catch {
      alert('Test creation failed')
    }
  }

  render() {
    return (
      <div>
        <h1>Update Test Date</h1>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Input
              fluid
              placeholder="Address"
              onChange={this.handleTestDateChange}
              value={this.state.testDate}
              type="date"
            />
            <br />
            <Button onClick={() => this.onUpdateAddress()}>
              Update
            </Button>
          </Grid.Column>
        </Grid.Row>
      </div>
    )
  }
}
