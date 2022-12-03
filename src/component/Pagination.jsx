import React from 'react';
import styles from "../style/Employees.module.css"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Pagination = ({ dataPerPage, totalData, paginate, pageNow }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.paginationContent}>
      <h3>Page Number</h3>
      <ul>
          <li key={pageNow-1}>
            <button onClick={() => paginate(pageNow-1)} className={pageNow === 1 ? styles.hiddenButton : styles.showButton}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
          </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)} className={pageNow === number ? styles.activeButton : styles.inactiveButton}> {number} </button>
          </li>
        ))}
        <li key={pageNow+1}>
            <button onClick={() => paginate(pageNow+1)} className={pageNow === pageNumbers.length ? styles.hiddenButton : styles.showButton}> <FontAwesomeIcon icon={faChevronRight} /> </button>
          </li>
      </ul>
    </div>
  );
};