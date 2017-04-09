import expect from 'expect';
import roleReducer from '../../reducers/roleReducer';
import * as actions from '../../actions/roleActions';

describe('Role Reducer', () => {
  it('should load roles when passed GET_ROLES_SUCCESS', () => {
    const initialState = {
      roles: []
    };
    const roles = [
      { id: 2, category: 'Admin' },
       { id: 3, category: 'Regular' },
    ];
    const expectedState = { roles };
    const action = actions.getRolesSuccess(roles);
    const newState = roleReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should return editable rolw when passed EDIT_ROLE_SUCCESS', () => {
    const initialState = {
      editRole: {}
    };
    const role = { id: 2, category: 'Admin' };
    const expectedState = { editRole: role };
    const action = actions.editRole(role);
    const newState = roleReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
