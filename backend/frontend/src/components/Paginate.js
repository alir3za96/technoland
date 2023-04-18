import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ page, pages,keyword, keywordUrl, isAdmin = false }) {
    if (keyword) {
        keyword = keyword.split('=')[1].split('&')[0]
    }

    const halfPages = Math.round(pages / 2)

    const middlePageNumber = [halfPages-2, halfPages-1, halfPages, halfPages +1, halfPages+2]
    const [middlePages,setMiddlePages] = useState(middlePageNumber)

    const lastPages = [page-4, page-3, page-2, page-1, page]
    const scrollTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        const updateMiddlePages = [page-2, page-1, page, page+1, page+2]
        setMiddlePages(updateMiddlePages)
    }, []);


    const paginateUrl = ''
    return (pages > 1 && (
        <>
        {pages > 10?(
            <Pagination onClick={scrollTop} className='mx-auto text-center justify-content-center'>
            <LinkContainer  to={`?keyword=${keywordUrl}&page=${1}`}>
            <Pagination.First disabled={page==1}/>
            </LinkContainer>
            <LinkContainer  to={page < 2 ? `?keyword=${keywordUrl}&page=${page}` : `?keyword=${keywordUrl}&page=${page - 1}` }>
            <Pagination.Prev disabled={page==1}/>
            </LinkContainer>
           <LinkContainer to={`?keyword=${keywordUrl}&page=${page<halfPages-2?
            page:1}`} >
           <Pagination.Item active={page<halfPages-2}>
           {page<halfPages-2?
            page:1   
        }
           </Pagination.Item>
           </LinkContainer>
            <Pagination.Ellipsis disabled/>
            {page>halfPages+2?
            <>
            {page<pages?
                 <>
                 {lastPages.map((x,index)=>(
                     <LinkContainer to={`?keyword=${keywordUrl}&page=${x}`}>
                     <Pagination.Item active={page==x}>{lastPages[index]}</Pagination.Item>
                     </LinkContainer>
                 ))}
                 </>
                 :
                 <>
                 {middlePageNumber.map((x,index)=>(
                     <LinkContainer to={`?keyword=${keywordUrl}&page=${x}`}>
                     <Pagination.Item active={page==x}>{middlePageNumber[index]}</Pagination.Item>
                     </LinkContainer>
                 ))}
                 </>
        }
           </>
            :
            <>
            {middlePageNumber.map((x,index)=>(
                <LinkContainer to={`?keyword=${keywordUrl}&page=${x}`}>
                <Pagination.Item active={page==x}>{middlePageNumber[index]}</Pagination.Item>
                </LinkContainer>
            ))}
            </>
            }
            

            <Pagination.Ellipsis disabled/>
            <LinkContainer to={`?keyword=${keywordUrl}&page=${pages}`}>
                <Pagination.Item active={page==pages}>{pages}</Pagination.Item>
            </LinkContainer>
            <LinkContainer to={page > pages-1 ? `?keyword=${keywordUrl}&page=${page}` : `?keyword=${keywordUrl}&page=${page + 1}` } disabled={page==pages}>
                <Pagination.Next />
            </LinkContainer>
                <LinkContainer to={`?keyword=${keywordUrl}&page=${pages}`} disabled={page==pages}>
                <Pagination.Last />
                </LinkContainer>
            </Pagination> 
):(
    <Pagination onClick={scrollTop} boundaryLinks={true} className='paginate-container mt-3'>
    {[...Array(pages).keys()].map((x) => (
        <LinkContainer
            key={x + 1}
            to={!isAdmin ?
                `?keyword=${keywordUrl}&page=${x + 1}`
                : `/admin/productlist/?keyword=${keywordUrl}&page=${x + 1}`
            }
        >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
    ))}

</Pagination>
)}
        </>
           )
    )
}

export default Paginate
