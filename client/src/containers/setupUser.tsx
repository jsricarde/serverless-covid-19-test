import dateFormat from 'dateformat'
import { History } from 'history'
import { createUser, getUser } from '../api/users-api'
import { createTest } from '../api/tests-api'
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { UserTestList } from '../containers/userTestList'
import {
  Button,
  Grid,
  Input,
  Loader
} from 'semantic-ui-react'
import Auth from '../auth/Auth'

interface UserProps {
  auth: Auth
  history: History
}

interface setupUserState {
  email: string
  createdAt: string
  name: string
  status: string
  phone: string
  address: string
  loadingUser: boolean
  isUserCreated: boolean
}

export class SetupUser extends React.PureComponent<UserProps, setupUserState> {
  state: setupUserState = {
    email: '',
    createdAt: new Date().toDateString(),
    name: '',
    status: '',
    phone: '',
    address: '',
    loadingUser: true,
    isUserCreated: false
  }


  async componentDidMount() {
    try {
      const user = await getUser(this.props.auth.getIdToken())
      this.setState({
        loadingUser: false,
      })
      if ('createdAt' in user) {
        this.setState({
          ...user,
          isUserCreated: true,
        })
      }

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value })
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phone: event.target.value })
  }

  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.target.value })
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Test
        </Loader>
      </Grid.Row>
    )
  }

  onScheduleTest = async () => {
    try {
      const user = cloneDeep(this.state);
      delete user.loadingUser

      const test = {
        createdAt: new Date().toDateString(),
      };

      const newUser = await createUser(this.props.auth.getIdToken(), user)
      const newTest = await createTest(this.props.auth.getIdToken(), test)
      alert('Test scheduled correctly')
    } catch {
      alert('Test creation failed')
    }
  }

  render() {
    if (this.state.loadingUser) {
      return this.renderLoading()
    }
    return (
      <div>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Input
              fluid
              placeholder="User Name"
              onChange={this.handleNameChange}
              value={this.state.name}
              disabled={this.state.isUserCreated}
            />
            <br />
            <Input
              fluid
              placeholder="Phone number"
              onChange={this.handlePhoneChange}
              value={this.state.phone}
              disabled={this.state.isUserCreated}
            />
            <br />
            <Input
              fluid
              placeholder="Email"
              onChange={this.handleEmailChange}
              value={this.state.email}
              disabled={this.state.isUserCreated}
            />
            <br />
            <Input
              fluid
              placeholder="Address"
              onChange={this.handleAddressChange}
              value={this.state.address}
              disabled={this.state.isUserCreated}
            />
            <br />
            <Button onClick={() => this.onScheduleTest()} disabled={this.state.isUserCreated}>
              Schedule a test
            </Button>
          </Grid.Column>
        </Grid.Row>
        <UserTestList auth={this.props.auth} address={this.state.address} history={this.props.history} />
      </div>
    )
  }
}
