import React from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
// import Avatar from "@mui/material/Avatar";
import { auth } from "../../firebase";
import { useHistory } from "react-router";

const Header = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  console.log("user1234", user);
  return (
    <div className="Header">
      <span className="logo">Atom - Engineering</span>
      {user && (
        <ul className="list">
          <li className="listItem">
            <Avatar src={user.photo} />
          </li>
          <li className="listItem">
            {/* <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                        Gaurav Jain
                    </Link>  */}
          </li>
          <li
            className="listItem"
            onClick={() => {
              auth.signOut();
              history.push("/auth");
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};
export default Header;
