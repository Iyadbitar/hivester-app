import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router'
import * as actionCreators from '../../actions';

import styles from './login.component.scss';

class Login extends React.Component {

  componentDidMount() {

  }

  handleSubmit = () => {
    this.props.actions.loginErrorAction(false);

    this.props.actions.userLoginAction({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  }

  getLoginError = () => {
    return this.props.isLoginError ?
    <div className={styles['error']}>
      <p>Error in loggin please try again</p>
    </div>
    :<div></div>
  }

  render() {
    if(this.props.user) {
      return <Redirect to={{pathname: '/dashboard'}} />
    }

    let loading;
    if(this.props.isDataLoading){
      loading = <span className={styles['loading']}>Loggin you...</span>;
    }
    else{
      loading = <span></span>;
    }
    return <div className={styles['container']}>
      <div className={styles['login']}>
        <h1 className={styles['h1']}>Hivester App</h1>
        <p className={styles['p']}>Enter your email and password to login</p>
        <div className={styles['form']}>
          <form onSubmit={this.handleSubmit}>
            {this.getLoginError()}
            <div className={styles['input-row']}>
              <input className={styles['input']} type="text" ref="email" placeholder="Email" ref="email"/>
            </div>
            <div className={styles['input-row']}>
              <input className={styles['input']} type="password" ref="password" placeholder="Password" ref="password"/>
            </div>
            <div className={styles['input-row']}>
              <button className={styles['button']} disabled={this.props.isDataLoading}>Login</button>
              {loading}
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.appState.user,
    isLoginError: state.uiState.isLoginError,
    isDataLoading: state.uiState.isDataLoading
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
