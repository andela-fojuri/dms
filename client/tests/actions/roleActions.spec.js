import expect from 'expect';
import * as roleActions from '../../actions/roleActions';
import * as types from '../../actions/actionTypes';

describe('Test Role Action', () => {
  it('shoud create a SHOW_EDITABLE_ROLE action', () => {
    const role = {
      category: '',
    };
    const expectedAction = {
      type: types.SHOW_EDITABLE_ROLE,
      role
    };

    const action = roleActions.editRole(role);
    expect(action).toEqual(expectedAction);
  });

  it('shoud create a GET_ROLES_SUCCESS action', () => {
    const roles = [{
      category: 'test'
    },
    {
      category: 'test2'
    }
    ];
    const expectedAction = {
      type: types.GET_ROLES_SUCCESS,
      roles
    };

    const action = roleActions.getRolesSuccess(roles);
    expect(action).toEqual(expectedAction);
  });
});
