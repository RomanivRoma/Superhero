import React, { useContext, useEffect, useState } from 'react'
import AddEditHero from '../AddEditHero/AddEditHero'
import HeroItem from '../HeroItem/HeroItem'
import s from './HeroList.module.css'
import axios from 'axios'
import ModalContext from '../../../contexts/modalContext'

const HeroList = ({heroList}) => {
  let {modalOpen, setModalOpen, heroId, setHeroId} = useContext(ModalContext)


  return (
      <div className={s.hero__wrapper}>
          {heroList.map(hero =>
            <HeroItem key={hero.id+''} nickname={hero.nickname} img={hero.name} id={hero.id}/>
          )}
          <div className={s.addButton__wrapper}>
            <img className={s.addButton} src={require("../../../assets/images/add.svg").default} onClick={() => setModalOpen(true)}/>
          </div>
          {modalOpen && <AddEditHero  setOpenModal={setModalOpen}/> }
      </div>
  )
}

export default HeroList
