import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Octokit} from "@octokit/rest";
import {getUsers, setUser} from '../actions/post';
import UserItem from './UserItem';
import {token} from '../config';

// Github Api Object
const octokit = new Octokit({
  auth: token,
  userAgent: 'xmas83'
});

//The main component to display the list of users and their info
const Landing = ({posts, user, getUsers, setUser}) => {

  const [userinfo, setUserinfo] = useState(null);
  const [search, setSearch] = useState('');
  const [pageUsers, setPageUsers] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [totalNumber, setTotalNumber] = React.useState(0)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)

  React.useEffect(() => {
    if (search === "") {
      setPageUsers(posts.slice((pageNumber - 1) * 5, pageNumber * 5))
      setTotalNumber(posts.length);
      setMaxPageNumber(Math.ceil(posts.length / 5))
    } else {
      setPageUsers(posts.filter(item => item.login.startsWith(search)).slice((pageNumber - 1) * 5, pageNumber * 5))
      setTotalNumber(posts.filter(item => item.login.startsWith(search)).length);
      setPageNumber(1);
      setMaxPageNumber(Math.ceil(posts.filter(item => item.login.startsWith(search)).length / 5))
    }
  }, [posts, pageNumber, search])

  // Go to the next page
  const nextPage = () => {
    if (pageNumber + 1 > maxPageNumber) {
      lastPage()
      return
    }
    setPageNumber(pageNumber + 1)
  }

  // Go to the previous page
  const prevPage = () => {
    if (pageNumber - 1 < 1) {
      firstPage()
      return
    }
    setPageNumber(pageNumber - 1)
  }

  // Go to first page
  const firstPage = () => {
    setPageNumber(1)
  }

  // Go to the last page
  const lastPage = () => {
    setPageNumber(maxPageNumber)
  }

  // Get the list of users using Git API
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (user) {
      octokit.request(`GET ${user.url.split('.com')[1]}`, {})
        .then(res => {
          setUserinfo(res.data)
        })
    }
  }, [user])

  return (
    <section className='landing'>
      <div className='sidebar'>
        <div className='sidebar-header'>
          <h2>Find Github Users</h2>
        </div>
        <div className='search'>
          <input
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='user-list'>
          {pageUsers.map((item, index) => <UserItem userinfo={userinfo} setUser={setUser} key={index} user={item}/>)}
        </div>
        {posts.length <= 10 ? null
          :
          <>
            <div className="pagination">
              {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageUsers.length} of {totalNumber}
            </div>
            <div className="pagination">
              <p onClick={() => firstPage()} className="page-icon">1</p>
              <p onClick={() => prevPage()} className="page-icon">{'<'}</p>
              <p onClick={() => nextPage()} className="page-icon">{'>'}</p>
              <p onClick={() => lastPage()} className="page-icon">{maxPageNumber}</p>
            </div>
          </>
        }
      </div>
      <div className='main'>
        {userinfo && (
          <div className='user-profile'>
            <div className='user-head'>
              <img src={userinfo.avatar_url}/>
              <h1>{userinfo.login}</h1>
            </div>
            <div className='user-info'>
              <div>
                <h1>FOLLOWERS</h1>
                <h3>{userinfo.followers}</h3>
              </div>
              <div>
                <h1>FOLLOWING</h1>
                <h3>{userinfo.following}</h3>
              </div>
              <div>
                <h1>REPOS</h1>
                <h3>{userinfo.public_repos}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  posts: state.post.posts,
  user: state.post.user
});

export default connect(mapStateToProps, {getUsers, setUser})(Landing);
