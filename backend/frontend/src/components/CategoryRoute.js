import React, { useEffect } from 'react'

const CategoryRoute = ({route}) => {

    useEffect(() => {
        // const updateMiddlePages = [page-2, page-1, page, page+1, page+2]
        // setMiddlePages(updateMiddlePages)
    }, []);


    console.log(route)
    return (
    <div className='category-route container-fluid text-muted'>
        خانه /
        کالای دیجیتال /
        کامپیوتر و تجهیزات جانبی /
        هدفون، هدست، میکروفون /
        {/* {" "}{product.category.title}                 */}
        {/* {route.map(cat=>(
            <div>{cat.title}</div>
        ))} */}
    </div>
  )
}

export default CategoryRoute