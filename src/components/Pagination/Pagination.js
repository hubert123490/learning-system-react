import classes from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes["pagination"]}>
      {pageNumbers.map((number) => (
        <span
          className={currentPage === number ? classes["active"] : ""}
          onClick={() => paginate(number)}
          key={number}
        >
          {number}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
