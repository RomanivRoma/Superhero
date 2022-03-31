import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import s from './HeroPage.module.css'
import Slider from "react-slick"
import axios from 'axios'

const HeroPage = () => {
    const params = useParams()
    const settings = {
      // className: "center",
      // centerMode: true,
      centerPadding: "60px",
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const [hero, setHero] = useState([])
    const [images, setImages] = useState([])
    useEffect(() =>{
      axios.get(`http://localhost:3001/heroes/img/${params.id}`)
      .then(function (response) {
          setImages(response.data)
      })
      axios.get(`http://localhost:3001/heroes/${params.id}`)
      .then(function (response) {
          setHero(response.data[0])
      })
    }, [])
  return (
    <div className={s.heroPage__wrapper}>
        <h2 className={s.hero__title}>{hero.nickname}</h2>
        <div className={s.hero__image}>
          { images &&
            <Slider {...settings} className={s.slider}>
              {images.map((image) =>{
                return <div data-index={image.id} key={image.id} className={s.slider__image__container}>
                  <img src={require(`../../../assets/heroes/${image.name}`)}/>
                </div>
                }
              )}
            </Slider> 
          }
          
        </div>
        <div className={s.heroInfo}>
          <p className={s.heroInfo__item}><span className={s.heroInfo__item__info}>Real name:</span> {hero?.real_name}</p>
          <p className={s.heroInfo__item}><span className={s.heroInfo__item__info}>Description of origin:</span> {hero?.origin_description}</p>
          <p className={s.heroInfo__item}><span className={s.heroInfo__item__info}>Superpowers: </span>{hero?.superpowers}</p>
          <p className={s.heroInfo__item}><span className={s.heroInfo__item__info}>Cathch phrase: </span>{hero?.catch_phrase}</p>
        </div>
    </div>
  )
}

export default HeroPage
