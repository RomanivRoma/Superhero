import React, { useContext } from 'react'
import s from './HeroItem.module.css'
import { Link } from 'react-router-dom';
import ModalContext from '../../../contexts/modalContext';
import axios from 'axios';

const HeroItem = ({id, nickname, img}) => {
  const {setModalOpen, setHeroId, heroList, setHeroList} = useContext(ModalContext)
  const handleDelete = () =>{
    console.log('deleting');
    axios.delete(`http://localhost:3001/heroes/${id}`)
    .then((res) =>{
      setHeroList(heroList.filter(el => el.id !== id))
    })
    
  }
  let image
  try{
    image = require('../../../assets/heroes/' + img)
  }catch(err){ }
  return (
    <div className={s.hero__item}>
        <Link to={`/heroes/${id}`} className={s.hero__item__wrapper}>
            { img ? <img className={s.hero__img} src={image}/> 
            : <div className={s.hero__img}>
                img
              </div>}
            <p className={s.hero__name}>{ nickname }</p>
        </Link>
        <div className={s.buttonsWrapper}>
          <img onClick={() =>{
              setHeroId(id)
              setModalOpen(true)
          }} className={"edit " + s.hero__edit} src={require('../../../assets/images/edit.svg').default}/>
            <img onClick={handleDelete} className={"delete " + s.hero__delete} src={require('../../../assets/images/delete.svg').default}/>
        </div>
        
    </div>
  )
}

export default HeroItem
