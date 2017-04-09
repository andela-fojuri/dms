import expect from 'expect';
import * as userActions from '../../actions/userActions';
import * as types from '../../actions/actionTypes';

describe('Test User Action', () => {
  it('shoud create a FIND_USER_SUCCESS action', () => {
    const user = {
      username: 'myTestUser',
      email: 'test@yahoo.com',
      roleId: 3
    };
    const expectedAction = {
      type: types.FIND_USER_SUCCESS,
      userDetails: user
    };

    const action = userActions.findUserSuccess(user);
    expect(action).toEqual(expectedAction);
  });

  it('shoud create an EDIT_USER action', () => {
    const user = {
      username: 'myTestUser',
      email: 'test@yahoo.com',
      roleId: 3
    };
    const expectedAction = {
      type: types.EDIT_USER,
      user
    };

    const action = userActions.editUser(user);
    expect(action).toEqual(expectedAction);
  });

  it('shoud create a GET_USERS_SUCCESS action', () => {
    const users = [{
      username: 'myTestUser',
      email: 'test@yahoo.com',
      roleId: 3
    },
    {
      username: 'myTestUser2',
      email: 'test2@yahoo.com',
      roleId: 2
    }
    ];
    const count = users.length;
    const expectedAction = {
      type: types.GET_USERS_SUCCESS,
      users,
      count
    };

    const action = userActions.getUsersSuccess(users, count);
    expect(action).toEqual(expectedAction);
  });

  it('shoud create a USER_LOGOUT_SUCCESS', () => {
    const expectedAction = {
      type: types.USER_LOGOUT_SUCCESS,
    };

    const action = userActions.userLogoutSuccess();
    expect(action).toEqual(expectedAction);
  });
});
