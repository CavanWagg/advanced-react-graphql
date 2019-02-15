import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export default class Signin extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            // form elements are get by default, change to post
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                //capture result and if okay clear form.
                e.preventDefault();
                const res = await signup();
                this.setState({ name: '', email: '', password: '' });
              }}
            >
              {/* disable the form and show a loading indicator while things are
              happening */}
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into your Account </h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign up</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
