import expect from 'expect';
import roleReducer from '../../reducers/roleReducer';
import * as actions from '../../actions/roleActions';

describe('Role Reducer', () => {
  it('should return role when passed CREATE_ROLE_SUCCESS', () => {
    const initialState = { roles: [] };
    const roleCreated = 'Role created Successfully';
      
    const action = actions.createRoleSuccess(roleCreated);
    const newState = roleReducer(initialState, action);

    expect(newState).toEqual('Role created Successfully');
  });

  it('should load roles when passed GET_ROLES_SUCCESS', () => {
    const initialState = {
      users: []
    };
    const roles = [
      { id: 2, category: 'Admin' },
       { id: 3, category: 'Regular' },
    ];
      
    const action = actions.getRolesSuccess(roles);
    const newState = roleReducer(initialState, action);

    expect(newState.roles.length).toEqual(2);
    expect(newState.roles[0].id).toEqual(2);
    expect(newState.roles[1].category).toEqual('Regular');
  });

  it('should return editable rolw when passed EDIT_ROLE_SUCCESS', () => {
    const initialState = {
      editRole: {}
    };
    const role = { id: 2, category: 'Admin' };
      
    const action = actions.editRole(role);
    const newState = roleReducer(initialState, action);

    expect(newState.editRole.id).toEqual(2);
    expect(newState.editRole.category).toEqual('Admin');
  });
});
