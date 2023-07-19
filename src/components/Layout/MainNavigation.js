import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <div>
      <header className={classes.header}>
        <Link className={classes.site_title} to="/home">
          Surf Enhancer
        </Link>
        <div style={{ flex: 1 }} />
        <nav className={classes.site_nav}>
          {/* <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul> */}
        </nav>
        {/* <div className={classes.profile_containter}>
          {(props.isLoggedIn === false || props.isLoggedIn === undefined) && (
            <>
              <Link className={classes.login_link} to="/login">
                Login
              </Link>
              <Link className={classes.register_link} to="/create-account">
                Sign Up
              </Link>
            </>
          )}
          {(props.isLoggedIn === true || props.isLoggedIn === undefined) && (
            <Link className={classes.profile_link} to="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5rem"
                viewBox="0 96 960 960"
                width="1.5rem"
              >
                <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
              </svg>
              <span>Hi, {props.username}</span>
            </Link>
          )}
        </div> */}
      </header>
    </div>
  );
};

export default MainNavigation;
