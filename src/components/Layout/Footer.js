import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes["main-footer"]}>
      <nav>
        <ul className={classes["main-footer__links"]}>
          <li className={classes["main-footer__link"]}>
            <span className={classes["copyright"]}>
              &copy; Copyright 2022, Bubex Corporation
            </span>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
