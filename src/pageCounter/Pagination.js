import React from 'react'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { leftLink, rightLink } from '../utils/images';
import { useSelector } from 'react-redux';


export default function PaginatedItems({currentPage, pageCount,getChangedPage }) {
    // We start with an empty list of items.
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [itemOffset, setItemOffset] = useState(0);
    const Dir = useSelector(state => state.Language.dir)
    // useEffect(() => {
    //   const endOffset = itemOffset + itemsPerPage;
    // }, [itemOffset, itemsPerPage]);
  
    const handlePageClick = (event) => {
        getChangedPage(event.selected+1)
    };
  
    return (
      <PaginationWrap>
        <ReactPaginate
         className='react-paginate'
          breakLabel="..."
          forcePage={currentPage}
          nextLabel={<img src={Dir==='ltr'?rightLink:leftLink} alt="" className='right-link' />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel={<img src={Dir==='ltr'?leftLink:rightLink} alt="" className='right-link' />}
          renderOnZeroPageCount={null}
          activeLinkClassName="active-page"
          previousLinkClassName="prev-link"
          nextLinkClassName="prev-link next-link"
          disabledLinkClassName="disabled-link"
          disabledClassName="disabled-link"
        />
      </PaginationWrap>
    );
  }
  


  const PaginationWrap=styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:end;
    .right-link{
     width:10px;
     margin:0 7px 2px;
     }
  .react-paginate{
      list-style:none;
      display:flex;
      align-items:center;
      flex-direction:row;
      padding-left:10px;
      padding-right:10px;
      margin-bottom:0;
      // padding-bottom: 10px;
      a{
          text-decoration:none;
          padding:10px 12px;
          background: #FFFFFF;
          margin:0 2px;
          border-radius: 6px;
         cursor:pointer;
        }
      .active-page{
        border: 1px solid rgba(20, 93, 160, 0.6);
        color:#000;
   
      }
      .prev-link{
          color:#fff;
        background: #145DA0;
        box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
        border-radius: 10px;
        padding:12px 10px;
        display:flex;
        justify-content:center;

      }
      .disabled-link.prev-link{
        background: #145DA09A;
        box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
        border-radius: 10px;
       cursor:auto;
      }
    
  }

  `