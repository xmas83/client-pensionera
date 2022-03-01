import React from 'react';
import {connect} from 'react-redux';


// The user item component
const UserItem = ({user, setUser, userinfo}) => {
  let flag = false; // checking if this is the selected item.
  if (userinfo && user) {
    flag = userinfo.login === user.login;
  }
  return (
    <div className={flag ? 'user-item selected' : 'user-item'} onClick={() => setUser(user)}>
      <img alt={user.login} src={user.avatar_url}/>
      <h3>{user.login}</h3>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(UserItem);
