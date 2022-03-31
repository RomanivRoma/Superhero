import React, { useContext, useEffect, useState } from 'react'
import "./AddEditHero.css"
import ModalContext from '../../../contexts/modalContext'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'

const AddEditHero = ({setOpenModal}) => {
    const {heroId, setHeroId, heroList, setHeroList} = useContext(ModalContext)
    const isAdding = heroId ? false : true
    const [hero, setHero] = useState()
    const [images, setImages] = useState([])

    const [nickname, setNickname] = useState('')
    const [real_name, setReal_name] = useState('')
    const [origin_description, setOrigin_description] = useState('')
    const [superpowers, setSuperpowers] = useState('')
    const [catch_phrase, setCatch_phrase] = useState('')

    const [removedImages, setRemovedImages] = useState([])
    const [addedImages, setAddedImages] = useState([])
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({
                                name: file.name,
                                base64: reader.result
                            });
        reader.onerror = error => reject(error);
    });

    const handleChangeStatus = ({ meta, file }, status) => {
        switch (status) {
            case 'removed':
                const addedLen = addedImages.length
                const filteredAdded = addedImages.filter(el=> el.lastModified !== file.lastModified)
                if(addedLen > filteredAdded.length){
                    setAddedImages(filteredAdded)
                    return
                }
                setRemovedImages([...removedImages, file])
                break;
            case 'done':
                if(images.find(el => el.lastModified == file.lastModified)) return
                setAddedImages([...addedImages, file])
                break;
            default:
                break;
        }
    }
    const handleSubmit = () =>{
        if(isAdding){
            const promises = addedImages.map(img =>{
                return toBase64(img)
            })
            Promise.all(promises)
            .then((result) =>{
                axios.post('http://localhost:3001/heroes/add', {
                    nickname,
                    real_name,
                    origin_description,
                    superpowers,
                    catch_phrase,
                    addedImages: JSON.stringify(result)
                }).then((res) =>{
                    setHeroList([...heroList, {
                        id: res.data,
                        nickname,
                        real_name,
                        origin_description,
                        superpowers,
                        catch_phrase,
                        name: result[0]?.name
                    }])

                })
            })
          

        }else{
            const promises = addedImages.map(img =>{
                return toBase64(img)
            })
            Promise.all(promises)
            .then( (res) =>{
                axios.put(`http://localhost:3001/heroes/${heroId}`, {
                    nickname,
                    real_name,
                    origin_description,
                    superpowers,
                    catch_phrase,
                    addedImages: JSON.stringify(res),
                    removedImages: removedImages.map(el => el.name)
                })
                .then(res =>{
                    const idx = heroList.findIndex(el => el.id == heroId)
                    let newArr = [...heroList]
                    newArr[idx].nickname = nickname
                    newArr[idx].real_name = real_name
                    newArr[idx].origin_description = origin_description
                    newArr[idx].superpowers = superpowers
                    newArr[idx].catch_phrase = catch_phrase
                    setHeroList(newArr)
                })
            })
        }
        setOpenModal(false)
    }
    const fetchImage = (imageName) => {
        return new Promise((resolve, reject) => {
            import(`../../../assets/heroes/${imageName}`).then(image => {
                fetch(image.default).then(res => {
                    res.arrayBuffer().then(buf => resolve(new File([buf], imageName, { type: `image/${imageName.split('.')[1]}` })))//   setImages(file))
                }) 
            });
        })
    };
    useEffect(() =>{  
        if(!heroId) return
        axios.get(`http://localhost:3001/heroes/img/${heroId}`)
        .then(function (response) {
            const arr = response.data
            const promiseArr = arr.map(el => fetchImage(el.name))
            Promise.all(promiseArr).then((results) => {
                setImages(results)
            })
        })
        axios.get(`http://localhost:3001/heroes/${heroId}`)
        .then(function (response) {
            const {nickname, 
                origin_description,
                real_name,
                superpowers,
                catch_phrase} = response.data[0]
            setNickname(nickname)
            setOrigin_description(origin_description)
            setReal_name(real_name)
            setSuperpowers(superpowers)
            setCatch_phrase(catch_phrase)
       
        })
    }, [])
    return (
        <>
            <div className="modalBackground" onClick={() => {
                    setHeroId(null)
                    setOpenModal(false);
                }}>
            </div>
            <div className="modalContainer">
            <div className="titleCloseBtn">
                <button
                onClick={() => {
                    setHeroId(null)
                    setOpenModal(false)
                }}
                >X</button>
            </div>
            <div className="title">
                <h1>Hero</h1>
            </div>
            <div className="body">
                <div className="input__wrapper">
                    <div className="input__container">
                        <input id="nickname" className="input" type="text" placeholder=" "
                         defaultValue={nickname}
                         onChange={(e) =>{
                            setNickname(e.target.value)
                        }}/>
                        <div className="cut"><span>Nickname</span></div>
                        <label htmlFor="nickname" className="placeholder">Nickname</label>
                    </div>
                    <div className="input__container">
                        <input id="real_name" className="input" type="text" placeholder=" "
                        defaultValue={real_name}
                         onChange={(e) =>{
                            setReal_name(e.target.value)
                        }}/>
                        <div className="cut"><span>Real Name</span></div>
                        <label htmlFor="real_name" className="placeholder">Real name</label>
                    </div>
                </div>
                <div className="input__container">
                    <textarea id="origin_description" className="input" type="text" placeholder=" "
                    defaultValue={origin_description}
                     onChange={(e) =>{
                            setOrigin_description(e.target.value)
                        }} />
                    <div className="cut"><span>Origin Description</span></div>
                    <label htmlFor="origin_description" className="placeholder">Origin description</label>
                </div>
                <div className="input__container">
                    <textarea id="superpowers" className="input" type="text" placeholder=" "
                    defaultValue={superpowers}
                     onChange={(e) =>{
                            setSuperpowers(e.target.value)
                        }} /> 
                    <div className="cut"><span>Superpowers</span></div>
                    <label htmlFor="superpowers" className="placeholder">Superpowers</label>
                </div>
                <div className="input__container">
                    <textarea id="catch_phrase" className="input" type="text" placeholder=" "
                    defaultValue={catch_phrase}
                     onChange={(e) =>{
                            setCatch_phrase(e.target.value)
                        }}/>
                    <div className="cut"><span>Catch Phrase</span></div>
                    <label htmlFor="catch_phrase" className="placeholder">Catch Phrase</label>
                </div>
                <div className="input__container">
                    <Dropzone
                        onChangeStatus={handleChangeStatus}
                        accept="image/*"
                        initialFiles={images || []}
                        maxSizeBytes={Math.pow(1024, 2)}
                    />
                </div>
            </div>
            <div className="footer">
                <button
                onClick={() => {
                    setHeroId(null)
                    setOpenModal(false)
                }}
                id="cancelBtn">
                Cancel
                </button>
                <button onClick={handleSubmit}>{!isAdding ? 'Edit' : 'Add'} Hero</button>
            </div>
        </div>
    </>
    )
}

export default AddEditHero