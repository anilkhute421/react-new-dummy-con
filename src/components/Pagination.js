import React from 'react'
import Pagination from 'react-bootstrap/Pagination'


export default function Pagination11({current,prev,next}) {
  let active = 5;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

  return (
    <div>
      <Pagination style={{display:'flex' , justifyContent:"end" , margin:"10px"}}  >
        <Pagination.Prev disabled/>
        
        <Pagination.Item active >{1}</Pagination.Item>
        <Pagination.Item >{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next disabled/>
      </Pagination>
    </div>
  )
}
