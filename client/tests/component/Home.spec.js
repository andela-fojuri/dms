import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { HomePage } from '../../components/home/HomePage';
import { SignupPage } from '../../components/user/SignupPage';
import { LoginPage } from '../../components/user/LoginPage';

function Home(islogin, isSignup) {
  const state = {
    islogin,
    isSignup
  };
  return shallow(<HomePage {...state} />);
}


describe('Homepage component suite', () => {
  describe('Home ', () => {
    const wrapper = Home(false, false);
    it('contains a button', () => {
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.contains(<SignupPage />)).toBeFalse;
    });
  });
  describe('SignUp ', () => {
    const wrapper = Home(false, true);
    it('contains a button', () => {
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.contains(<SignupPage />)).toBeTrue;
    });
  });

  describe('Login ', () => {
    const wrapper = Home(true, false);
    it('contains a button', () => {
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.contains(<SignupPage />)).toBeFalse;
      expect(wrapper.contains(<LoginPage />)).toBeTrue;
    });
  });
});
