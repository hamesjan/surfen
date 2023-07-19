import classes from "./InfoPage.module.css";
import wgif from "../../w.gif";

const InfoPage = () => {
  return (
    <div className={classes.outer_div}>
      This tool was made for fun. Have fun with it. No seriously. I'm being dead
      serious.
      <br />
      Tech Stack is React and Flask
      <br /> Yall dont know how to react and do the dash
      <br /> Spit some bars and get that cash
      <br /> Follow me on Insta @hamesjan and my Twitter @Skcurf
      <br />
      <br />
      <img width={200} height={100} src={wgif} alt="loading..." />
    </div>
  );
};

export default InfoPage;
