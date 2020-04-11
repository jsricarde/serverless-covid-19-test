import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditUserAdress } from './containers/editUserAddress'
import { AdminTestList } from './containers/adminTestList'
import { AdminUploadResult } from './containers/adminUploadResult'
import { AdminEditTestDate } from './containers/adminEditTestDate'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { SetupUser } from './containers/setupUser'

export interface AppProps { }

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <AdminTestList {...props} auth={this.props.auth} />
            // return <SetupUser {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/user/address/edit"
          exact
          render={props => {
            return <EditUserAdress {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/user/admin"
          exact
          render={props => {
            return <AdminTestList {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/tests/:userId/edit/:testId"
          exact
          render={props => {
            return <AdminUploadResult {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/tests/date/:userId/edit/:testId"
          exact
          render={props => {
            return <AdminEditTestDate {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
