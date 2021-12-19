import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navigator = () => {
  const location = useLocation();

  let url = location.pathname;
  let urls = url.split("/");
  urls.unshift("/");

  //delete empty values from array
  urls = urls.filter((n) => n);

  let paths = new Map();
  let path = "/";
  urls.forEach((element) => {
    if (element == "/") {
      paths.set(element, path);
      return;
    }
    path += element;
    paths.set(element, path);
    path += "/";
  });

  return (
    <div>
      <div>
        {urls.map((item, index) => {
          if (item == "/") {
            return (
              <span key={index}>
                <NavLink to={paths.get(item)}> home </NavLink>/
              </span>
            );
          } else {
            return (
              <span key={index}>
                <NavLink to={paths.get(item)}> {item} </NavLink>/
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Navigator;
