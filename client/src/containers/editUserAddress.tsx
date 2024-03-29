import * as React from 'react'
import { History } from 'history'
import {
  Button,
  Grid,
  Input,
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { updateUserAddress } from '../api/users-api'

interface EditUserAdressProps {
  auth: Auth
  history: History
}

interface EditUserAdressState {
  address: string
}

export class EditUserAdress extends React.PureComponent<
  EditUserAdressProps,
  EditUserAdressState
  > {
  state: EditUserAdressState = {
    address: '',
  }

  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.target.value })
  }


  onUpdateAddress = async () => {
    try {
      const { address } = this.state

      const updatedUser = await updateUserAddress(this.props.auth.getIdToken(), { address })
      alert('The address was updated!')
      this.props.history.push('/')
    } catch {
      alert('Test creation failed')
    }
  }

  render() {
    return (
      <div>
        <h1>Update Address</h1>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Input
              fluid
              placeholder="Address"
              onChange={this.handleAddressChange}
              value={this.state.address}
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
