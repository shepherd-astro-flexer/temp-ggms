import { Form, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
    const {meta} = useLoaderData()
    const {search, pathname} = useLocation()
    const navigate = useNavigate()
    const {page, pageCount,} = meta.pagination
  
    const handleNavigation = (pageNum) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set("page", pageNum)
      // we just convert it to a string // ! ohhh! it's also one of its properties, very nice!
      navigate(`${pathname}?${searchParams.toString()}`)
    }

    const pageCountArray = Array.from({length: pageCount}, (_, idx) => {
        const pageNum = idx + 1;
        
        return <button key={pageNum} className={`join-item btn btn-xs sm:btn-md border-none ${page === pageNum && "btn-active"}`} onClick={() => handleNavigation(pageNum)}>{pageNum}</button>
    })

  return (
    <Form className="flex justify-end pt-16">
        {pageCount > 1 && <div className="join">
          <button className="join-item btn btn-xs sm:btn-md" onClick={() => handleNavigation(page < 2 ? pageCount : page - 1)}>prev</button>
            {pageCountArray}
          <button className="join-item btn btn-xs sm:btn-md" onClick={() => handleNavigation(page + 1 > pageCount ? 1 : page + 1)}>next</button>
        </div>}
      </Form>
  )
}
export default Pagination