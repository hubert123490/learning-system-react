import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Navigator from './Navigator';
import classes from "./Layout.module.css"

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
