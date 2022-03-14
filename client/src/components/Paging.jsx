import React from "react";
import style from './Paging.module.css'

export default function Paging({ totalPages, currentPage, pages }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const firstPage = 1;
  const lastPage = totalPages;

  return (
    <nav>
      <ul className={style.list}>
        {/* First number */}
        <li className={currentPage !== firstPage ? style.show : style.hide}>
          <button id={style.first} onClick={() => pages(firstPage)}>First</button>
        </li>
        {/* previous number */}
        <li className={currentPage !== firstPage ? style.show : style.hide}>
          <button onClick={() => pages(currentPage - 1)}>{currentPage - 1}</button>
        </li>
        {/* current */}
        <li>
          <button id={style.current} disabled>{currentPage}</button>
          </li>
        {/* next number */}
        <li className={currentPage !== lastPage ? style.show : style.hide}>
          <button onClick={() => pages(currentPage + 1)}>{currentPage + 1}</button>
        </li>
        {/* Last number */}
        <li className={currentPage !== lastPage ? style.show : style.hide}>
          <button id={style.last} onClick={() => pages(lastPage)}>Last</button>
        </li>
      </ul>
    </nav>
  );
}