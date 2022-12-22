// Write your JS code here

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLogInSuccessful: true,
  }

  loginSuccessful = () => {
    const {history} = this.props
    history.replace('/')
  }

  onLoginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' || password === '') {
      this.setState({isLogInSuccessful: true})
    }
    const userLoginDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginDetails),
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({isLogInSuccessful: true})
      this.loginSuccessful()
    } else {
      this.setState({isLogInSuccessful: false})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onPasswordBlur = event => {
    if (event.target.value === '') {
      this.setState({isLogInSuccessful: true})
    }
  }

  onUserBlur = event => {
    if (event.target.value === '') {
      this.setState({isLogInSuccessful: true})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          onBlur={this.onPasswordBlur}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          onBlur={this.onUserBlur}
        />
      </>
    )
  }

  render() {
    const {isLogInSuccessful} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onLoginSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {!isLogInSuccessful ? (
            <p className="error-message">*Username and Password didn't match</p>
          ) : (
            ''
          )}
        </form>
      </div>
    )
  }
}

export default LoginForm
