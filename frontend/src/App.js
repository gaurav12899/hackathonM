import React from 'react'
import './App.css';
//import SideBar from './Components/SideBar/SideBar'
// import Feed from './Components/Feed/Feed'
// import Widgets from './Components/Widgets/Widgets'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Bookmark from './Components/Bookmarks/Bookmarks';
import Header from './Components/Header/Header'
import Question from './Components/AddQuestion/Question'
import ViewQuestion from './Components/ViewQuestion/ViewQuestion';
import Auth from "./Components/Auth/index";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./feature/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import ExploreQuestions from './Components/ExploreQuestions/ExploreQuestions';
import AddPost from './Components/AddNewPost/AddPost';
import Landing from './Components/Landing/Landing';
import Freelancing from './Components/Freelancing';
import FreelancingRegister from './Components/Freelancing/Freelancing';
import CardDetails from './Components/Freelancing/CardDetails';
import ArticleForm from './Components/Article/ArticleForm';
import Article from './Components/Article/index';
import Registrations from './Components/Landing/Registrations';
import axios from 'axios';
import ArticleView from './Components/Article/ArticleView';
// import UpdateProfileA from './Components/Profile/UpdateProfileA';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      console.log('authUser', authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('user private', user);
    return <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
    };

    const ProtectedRoute = ({ component: Component, ...rest }) => {
      return <Route
        {...rest}
        render={(props) =>
          !user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
      };
  return (
    <div>
          <Header/>
        <Router>
        <Switch>

        {/* <Route path={user ?"/":"/auth"} exact component={user? HomePage :Auth} /> */}
        {/* <PrivateRoute path="/updateProfileA" component={UpdateProfileA} /> */}
        <Route path={"/"} exact component={user? HomePage : Landing} />
        <Route path={"/registration"} exact component={user? Registrations : Landing} />
        <PrivateRoute path={"/"} exact component={HomePage} />
        <PrivateRoute path="/qna" component={ExploreQuestions} />
        <PrivateRoute path="/freelancing" component={Freelancing} />
        <PrivateRoute path = "/register-freelancing" component={FreelancingRegister}/>
        <PrivateRoute path="/freelancer" component={CardDetails} />
        <PrivateRoute path="/article" component={Article} />
        <PrivateRoute path="/article-form" component={ArticleForm} />
        <PrivateRoute path="/article-view/:id" component={ArticleView} />
        <PrivateRoute path="/freelancer/:id" component={CardDetails} />

        {/* <PrivateRoute path="/bookmarks" component={Bookmark} /> */}
        <PrivateRoute path ="/add-question" component={Question}/>
        <PrivateRoute path ="/question" component={ViewQuestion}/>
        <PrivateRoute path = "/add-post" component={AddPost}/>

        <ProtectedRoute path={"/"} exact />


      </Switch>
   </Router>
    </div>
  )
};
// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/profile" component={Profile} />
//         <Route path="/bookmarks" component={Bookmark} />
//       </Switch>
//     </Router>
//   );
// }

export default App;
