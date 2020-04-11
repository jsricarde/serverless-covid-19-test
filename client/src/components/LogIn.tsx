import * as React from 'react'
import Auth from '../auth/Auth'
import { Button } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState { }

export class LogIn extends React.PureComponent<LogInProps, LogInState> {
  onLogin = (role: string) => {
    this.props.auth.login(role)
  }

  render() {
    return (
      <div>
        <h1>CovidTest</h1>

        <Button onClick={() => this.onLogin('normal')} size="huge" color="green">
          Log in as a normal User
        </Button>

        <Button onClick={() => this.onLogin('admin')} size="huge" color="blue">
          Log in as an Admin
        </Button>
      </div>
    )
  }
}
