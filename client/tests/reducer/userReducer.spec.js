import expect from 'expect';
import userReducer from '../../reducers/userReducer';
import * as actions from '../../actions/userActions';

describe('User Reducer', () => {
  it('should load user when passed FIND_USER_SUCCESS', () => {
    const initialState = {
      userDetails: {}
    };
    const userDetails = {
      id: 1,
      username: 'name',
      email: 'email@me.com',
      roleId: 4
    };

    const action = actions.findUserSuccess(userDetails);
    const newState = userReducer(initialState, action);
    expect(newState.userDetails.id).toEqual(1);
    expect(newState.userDetails.username).toEqual('name');
    expect(newState.userDetails.email).toEqual('email@me.com');
  });

  it('should load users when passed GET_USERS_SUCCESS', () => {
    const initialState = {
      users: []
    };
    const users = [
      { id: 2, username: 'user', email: 'email@me.com', roleId: 5 },
       { id: 3, username: 'user2', email: 'email2@me.com', roleId: 3 },
       { id: 4, username: 'user3', email: 'email3@me.com', roleId: 2 },
       { id: 5, username: 'user4', email: 'email4@me.com', roleId: 6 }
    ];
      
    const action = actions.getUsersSuccess(users);
    const newState = userReducer(initialState, action);

    expect(newState.users.length).toEqual(4);
    expect(newState.users[1].id).toEqual(3);
    expect(newState.users[3].email).toEqual('email4@me.com');
  });

  it('should return user when passed EDIT_USER_SUCCESS', () => {
    const initialState = {
      editUser: {}
    };
    const user = { id: 2, username: 'user', email: 'email@me.com', roleId: 5 };
      
    const action = actions.editUser(user);
    const newState = userReducer(initialState, action);

    expect(newState.editUser.id).toEqual(2);
    expect(newState.editUser.username).toEqual('user');
  });
});
