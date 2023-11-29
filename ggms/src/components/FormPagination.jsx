import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

const FormPagination = () => {
   const {numberOfPages, currentPage} = useLoaderData();
   const navigate = useNavigate();
   const {pathname, search} = useLocation();

   const navigatePages = (page) => {
    // * this will extract the search params from the url
     const newURL = new URLSearchParams(search);
     newURL.set("page", page)

     navigate(`${pathname}?${newURL.toString()}`);
   }
 
    const pagesArray = Array.from({length: numberOfPages}, (_, idx) => {
      const page = idx + 1;

      return <button key={page} className={`join-item btn btn-sm ${page === currentPage && "btn-active"}`} onClick={() => navigatePages(page)}>{page}</button>
    })

    if (numberOfPages < 2) {
      return null
    }

  return (
    <div className="join mt-6 flex justify-end">
      {pagesArray}
    </div>
  )
}
export default FormPagination