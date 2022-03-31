const fs = require('fs')

const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({ limit: '2mb' })
var urlencodedParser = bodyParser.urlencoded({ limit: '2mb', extended: false })

const mysql = require('mysql')

const IMAGES_PATH = '../client/src/assets/heroes/'
app.use(cors())

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vt;bushcmrf',
    database: 'superhero_app',
    multipleStatements: true
})



app.get('/heroes/img/:id', jsonParser, (req, res) =>{
    const sql = `SELECT 
        id_img id, name
    FROM
        superheroes s
            JOIN
        suphero_img i ON s.id = i.id_superhero
        WHERE id = ${req.params.id};`
    db.query(
        sql, 
        (err, result) =>{
            if(err) {
                console.log(err);
                return
            }else{
                res.send(result)
            }
    })
})
app.get('/heroes', jsonParser, (req, res) =>{
    const sql = `
    SELECT 
        *
    FROM
        superheroes s
            JOIN
        suphero_img i ON s.id = i.id_superhero
        GROUP BY id;`
    db.query(
        sql, 
        (err, result) =>{
            if(err) {
                console.log(err);
                return
            }else{
                res.send(result)
            }
    })

})
app.get('/heroes/:id', jsonParser, (req, res) =>{
    const sql = `
    SELECT * FROM superhero_app.superheroes WHERE id = ${req.params.id};`
    db.query(
        sql, 
        (err, result) =>{
            if(err) {
                console.log(err);
                return
            }else{
                res.send(result)
            }
    })
})
app.post('/heroes/add', jsonParser, (req, res) =>{
    const nickname = req.body.nickname
    const real_name = req.body.real_name
    const origin_description = req.body.origin_description
    const superpowers = req.body.superpowers
    const catch_phrase = req.body.catch_phrase
    let last_id
    const images = JSON.parse(req.body.addedImages)
    // for (const {base64, name} of images){
    let promises = images.map(({base64, name}) =>{
        console.log(name, base64);
        return new Promise((resolve, reject) => {
            let base64Image = base64.split(';base64,').pop();
            fs.writeFile(`${IMAGES_PATH}${name}`, base64Image, {encoding: 'base64'}, function(){
                resolve()
            })
        })
    })
    Promise.all(promises).then((results) => {
        // console.log(require('../client/src/assets/heroes/'+images[0].name));
        db.query(
            `INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase) VALUES(?, ?, ?, ?, ?);
            SELECT LAST_INSERT_ID() last_id;`, 
            [nickname, real_name, origin_description, superpowers, catch_phrase],
            (err, result) =>{
                if(err) {
                    console.log(err);
                    return
                }else{
                    last_id = JSON.parse(JSON.stringify(result[1][0].last_id));
                    db.query(`INSERT INTO 
                                suphero_img(name, id_superhero)
                            VALUES
                                ${
                                    images.map(({name}, i) => `('${name}', ${last_id})${images.length - 1 == i ? ';' : ''}`
                                    )
                                }
                            `, 
                        (err, result) =>{
                        if(err) {
                            console.log(err);
                            return
                        }else{
                            // res.end(last_id)                        
                            res.send(last_id+'')
                            console.log(result, 'inserted id');
                        }
                    })
                    console.log('Values Inserted')
                }
            }
        )
    })
        // .then(() =>{
        //     console.log('File created');

        // });
    // }

   
 
    
 
   
})
app.put('/heroes/:id', jsonParser, (req, res) =>{
    const sql = `UPDATE superheroes
    SET
    nickname = "${req.body.nickname}",
    real_name = "${req.body.real_name}",
    origin_description = "${req.body.origin_description}",
    superpowers = "${req.body.superpowers}",
    catch_phrase = "${req.body.catch_phrase}"
    WHERE id = ${req.params.id};
    
    `
    db.query(
        sql, 
        (err, result) =>{
            if(err) {
                console.log(err);
                return
            }else{
                res.send(200)
                console.log(`ID: ${req.params.id} succesfully updated`);
                // res.send(result)
               
            }
    })
    let removedImages = req.body.removedImages
    if(removedImages.length){
        removedImages.forEach(el =>{
            fs.unlink(`${IMAGES_PATH}${el}`, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
            })
        })

        db.query(`DELETE FROM suphero_img
                WHERE (name) IN ("${removedImages.join(', ')}") and id_superhero = ${req.params.id};`,
            (err, result) =>{
                if(err) {
                    console.log(err);
                    return
                }else{
                    // res.send(200)
                }
            }
        )
    }
    let addedImages =  JSON.parse(req.body.addedImages)
    if(addedImages.length){
        addedImages.forEach(({base64, name}) =>{
            let base64Image = base64.split(';base64,').pop();
            fs.writeFile(`${IMAGES_PATH}${name}`, base64Image, {encoding: 'base64'}, function(){
                // console.log('images updated');
            })
        })
        db.query(`INSERT INTO 
                suphero_img(name, id_superhero)
            VALUES
                ${
                    addedImages.map(({name}, i) => `('${name}', ${req.params.id})${addedImages.length - 1 == i ? ';' : ''}`
                    )
                }
            `, 
        (err, result) =>{
        if(err) {
            console.log(err);
            return
        }else{
        }
        })
    }
   
})
app.delete('/heroes/:id', jsonParser, (req, res) =>{
    const sql = `DELETE FROM superheroes
                WHERE id = ${req.params.id};`
    const images = `SELECT 
                        id_img id, name
                    FROM
                        superheroes s
                            JOIN
                        suphero_img i ON s.id = i.id_superhero
                        WHERE id = ${req.params.id};`
    db.query(
        images, 
        (err, result) =>{
            if(err) {
                console.log(err);
                return
            }else{
                JSON.parse(JSON.stringify(result)).forEach(el => {
                    console.log(el);
                    fs.unlink(`${IMAGES_PATH}${el.name}`, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                      })
                });
                db.query(
                    sql, 
                    (err, result) =>{
                        if(err) {
                            console.log(err);
                            return
                        }else{
                            res.send(200)
                            console.log(`ID: ${req.params.id} succesfully deleted`);
                            // res.send(result)
                    
                        }
                })
            }
    })


})

app.listen(3001, () =>{

    console.log('running on port 3001');
})