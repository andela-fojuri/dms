import expect from 'expect';
import * as userActions from '../../actions/userActions';
import * as types from '../../actions/actionTypes';

describe('Test User Action', () => {
  it('shoud create a FIND_USER_SUCCESS action', () => {
    const user = { username: 'myTestUser',
      email: 'test@yahoo.com',
      roleId: 3 };
    const expectedAction = {
      type: types.FIND_USER_SUCCESS,
      userDetails: user
    };

    const action = userActions.findUserSuccess(user);
    expect(action).toEqual(expectedAction);
  });
});
