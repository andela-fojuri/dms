import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { DashboardPage } from '../../components/dashboard/DashboardPage';
import { DashboardMenu } from '../../components/dashboard/DashboardMenu';
import { DocumentForm } from '../../components/document/DocumentForm';
import { DocumentGrid } from '../../components/document/DocumentGrid';
import { UsersPage } from '../../components/user/UsersPage';
import { RoleForm } from '../../components/role/RoleForm';
import { RoleGrid } from '../../components/role/RoleGrid';



function Dashboard(showDoc, showUsers, showRoles) {
  const state = {
    showDoc,
    showUsers,
    showRoles
  };
  return shallow(<DashboardPage {...state} />);
}


describe('Dashboard component suite', () => {
  it('contains default components', () => {
    const wrapper = Dashboard();
    expect(wrapper.contains(<DashboardMenu />)).toBeTrue;
  });
  describe('Document ', () => {
    const wrapper = Dashboard(true, false, false);
    it('contains Document Component', () => {
      expect(wrapper.contains(<DocumentGrid />)).toBeTrue;
      expect(wrapper.contains(<DocumentForm />)).toBeTrue;
      expect(wrapper.contains(<DashboardMenu />)).toBeTrue;
    });
  });
  describe('User ', () => {
    const wrapper = Dashboard(false, true, false);
    it('contains UsersPage Component', () => {
      expect(wrapper.contains(<UsersPage />)).toBeTrue;
     expect(wrapper.contains(<DashboardMenu />)).toBeTrue;
    });
  });

  describe('Role ', () => {
    const wrapper = Dashboard(false, false, true);
    it('contains Role Component', () => {
      expect(wrapper.contains(<RoleGrid />)).toBeFalse;
      expect(wrapper.contains(<RoleForm />)).toBeTrue;
      expect(wrapper.contains(<DashboardMenu />)).toBeTrue;
    });
  });
});
