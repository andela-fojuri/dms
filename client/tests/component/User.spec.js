import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { LoginForm } from '../../components/user/forms/LoginForm';
import { SignupForm } from '../../components/user/forms/SignupForm';

function Login() {
  return shallow(<LoginForm />);
}

function Signup(roleId) {
  const props = {
    user: {
      roleId
    }
  };
  return shallow(<SignupForm {...props} />);
}

describe('User component suite', () => {
  describe('Login Form', () => {
    const wrapper = Login();
    it('contains a form', () => {
      expect(wrapper.find('form').length).toBe(1);
    });

    it('contains 2 input elements', () => {
      expect(wrapper.find('input').length).toBe(2);
    });

    it('contains input element of type password', () => {
      expect(wrapper.contains(<input type="password" />)).toBeTrue;
    });
  });

  describe('Signup Form', () => {
    const wrapper = Signup(2);
    it('contains a form', () => {
      expect(wrapper.find('form').length).toBe(1);
    });

    it('contains 2 input elements', () => {
      expect(wrapper.find('input').length).toBe(4);
    });

    it('contains input element of type password', () => {
      expect(wrapper.contains(<input type="password" />)).toBeTrue;
    });
  });
});
