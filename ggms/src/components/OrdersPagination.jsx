import { Form, useLoaderData, useLocation, useNavigate } from "react-router-dom"

const OrdersPagination = () => {
    const {meta} = useLoaderData()
    const {page, pageCount} = meta.pagination
    const { search, pathname } = useLocation()
    const navigate = useNavigate()

    const handlePagination = async (pageNum) => {
        const searchParams = new URLSearchParams(search)
        searchParams.set("page", pageNum)
        navigate(`${pathname}?${searchParams.toString()}`)
    }

    const paginationArray = Array.from({length: pageCount}, (_, idx) => {
        const pageNum = idx + 1;

        if (pageNum === 1 || pageNum === pageCount) {
            return null
        }

        return <button key={pageNum} className={`btn btn-xs join-item ${page === pageNum ? "btn-active" : "hidden"} sm:btn-md`} onClick={() => handlePagination(pageNum)}>
            {pageNum}
        </button>
    })

    if (pageCount < 2) {
        return null
    }
   
  return (
    <div className="flex justify-end mt-16">
        <Form className="join">
            <button className="btn btn-xs join-item sm:btn-md" onClick={() => handlePagination(page - 1 < 1 ? pageCount : page - 1)}>prev</button>
            <button className={`btn border-none btn-xs join-item sm:btn-md ${page === 1 && "btn-active" }`} onClick={() => handlePagination(1)}>
                1
            </button>
            {(page > 2 && page !== pageCount) && <button className="btn border-none btn-xs join-item sm:btn-md"type="button">...</button>}
            {paginationArray} 
            {page !== pageCount - 1 && <button className="btn border-none btn-xs join-item sm:btn-md" type="button">...</button>}
            <button className={`btn border-none btn-xs join-item ${page === pageCount && "btn-active" } sm:btn-md`} onClick={() => handlePagination(pageCount)}>
            {pageCount}
            </button>
            <button className="btn btn-xs join-item sm:btn-md" onClick={() => handlePagination(page + 1 > pageCount ? 1 : page + 1)}>next</button>
        </Form>
    </div>
    
  )
}
export default OrdersPagination