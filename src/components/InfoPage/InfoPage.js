import classes from "./InfoPage.module.css";
import wgif from "../../assets/w.gif";
import first from "../../assets/first.gif";
import out from "../../assets/out.gif";

const InfoPage = () => {
  return (
    <div className={classes.outer_div}>
      This tool was made for fun. Have fun with it. No seriously. I'm being dead
      serious. <br />
      It is not very responsive to mobile devices so try on a desktop or laptop
      if it's buggy.
      <br />
      <b> This is what it does.</b>
      <div className={classes.vid_demo}>
        <img width={300} height={200} src={first} alt="loading..." />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23.828"
          height="14.769"
          style={{ padding: "10px" }}
        >
          <path d="m13.616 2.828 2.585 2.586H0v4h16.143l-2.527 2.526 2.828 2.829 7.384-7.384L16.444 0l-2.828 2.828z" />
        </svg>
        <img width={300} height={200} src={out} alt="loading..." />
      </div>
      <br />
      It is still a work in progress so give me some time and I'll make it
      awesome.
      <br />
      <br />
      <b style={{ color: "red" }}>
        PRO TIP: if the optical flow isn't working correctlty, try setting the
        starting box a little down the line from where the you takes off.
      </b>
      <br />
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
