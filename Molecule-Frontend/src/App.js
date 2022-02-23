import React from 'react'
import './App.css';
//import SideBar from './Components/SideBar/SideBar'
// import Feed from './Components/Feed/Feed'
// import Widgets from './Components/Widgets/Widgets'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import HomePage from './Components/HomePage/HomePage';
import Bookmark from './Components/Bookmarks/Bookmarks';
import Navbar from './Components/Navbar/Navbar'
import Question from './Components/AddQuestion/Question'
import ViewQuestion from './Components/ViewQuestion/ViewQuestion';

function App() {
  return (
    <div>
      <Navbar />
        <Router>
        <Switch>
        <Route path="/" exact component={HomePage} />
         <Route path="/profile" component={Profile} />
        <Route path="/bookmarks" component={Bookmark} />
        <Route path ="/add-question" component={Question}/>
        <Route path ="/question" component={ViewQuestion}/>

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
