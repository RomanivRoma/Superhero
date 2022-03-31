import React, {useState, useEffect} from 'react'
import HeroList from '../Hero/HeroList/HeroList'
import ModalContext from '../../contexts/modalContext'
import ReactPaginate from 'react-paginate';
import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'

const PER_PAGE = 5;


const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [heroId, setHeroId] = useState(null);
  const [heroList, setHeroList] = useState([])


  useEffect(() =>{
    axios.get(`http://localhost:3001/heroes`)
      .then(function (response) {
        setHeroList(response.data)
      })
  }, [])
  // Pagintion
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = heroList
  .slice(offset, offset + PER_PAGE)

  const pageCount = Math.ceil(heroList.length / PER_PAGE);

  
  
  return (
    <ModalContext.Provider value={{modalOpen, setModalOpen, heroId, setHeroId, heroList, setHeroList}}>
      <div style={{width: '91%', margin: '40px auto'}}>
          <HeroList heroList={currentPageData}/>
          { heroList.length > 5 ? 
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
          : null  
        }
      </div>
    </ModalContext.Provider>
  )
}

export default Home
