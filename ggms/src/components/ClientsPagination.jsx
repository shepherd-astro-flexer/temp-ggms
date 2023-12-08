import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { paginationTest } from "../utils";
import { useSelector } from "react-redux";

const ClientsPagination = ({attendance}) => {
  const {data} = useSelector((store) => store.client);
   const {numberOfPages, currentPage} = data;
   console.log(numberOfPages);
   const navigate = useNavigate();
   const {pathname, search} = useLocation();

  const navigatePages = (page) => {
    // * this will extract the search params from the url
     const newURL = new URLSearchParams(search);
     newURL.set("page", page)
     navigate(`${pathname}?${newURL.toString()}`);
   }
  
  const renderPagination = paginationTest(numberOfPages, currentPage);
  
  if (numberOfPages < 2) {
    return null
  }
  
  return (
    <div className="join mt-16 flex justify-end">
      <button className={`join-item btn ${attendance && "btn-sm bg-base-100"}`} onClick={() => navigatePages(currentPage - 1 < 1 ? numberOfPages : currentPage - 1)}>prev</button>
      {renderPagination.map((page, idx) => {
        if (page === "...") {
          return <button key={idx} className={`join-item btn ${attendance && "btn-sm bg-base-100"}`} type="button">{page}</button>
        }

        return <button key={idx} className={`join-item btn ${attendance && "btn-sm bg-base-100"} ${page === currentPage && attendance && "bg-base-300"} ${page === currentPage && "btn-active"}`} onClick={() => navigatePages(page)}>{page}</button>
      })}
      <button className={`join-item btn ${attendance && "btn-sm bg-base-100"}`} onClick={() => navigatePages(currentPage + 1 > numberOfPages ? 1 : currentPage + 1)}>next</button>
    </div>
  )
}
export default ClientsPagination