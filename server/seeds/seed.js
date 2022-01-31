const mongoose = require('mongoose');
const connection = require('../config/connection')
const { Product, User } = require('../models')
// const db = require('../config/connection').mongoURI;
const fetch = require('node-fetch')

let resultData;
// let saveCounter = 0;


connection.once('open', async () => {
    await Product.deleteMany()

    console.log("connected")
    
    const url = ['https://api.thedogapi.com/v1/images/search?limit=5&page=10&order=Desc&mime_types=jpg,png']
    
    const productData = []
    url.map(async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            
            resultData = [...json];

            // console.log(resultData)
            // console.log(resultData[0]['breeds'])
            
            
            for (let i = 0; i < 4; i++) {
                    // console.log(resultData[i]['breeds'][0])
                    // console.log(resultData[i])
                    // console.log(resultData[0]['breeds'])
                    let name;
                    let description;
                    if(resultData[i] === undefined || resultData[i]['breeds'][0] === undefined) {
                        name = 'Spot'
                        description = 'good dog'
                    } else {
                        name = resultData[i]['breeds'][0]['name'];
                        description = resultData[i]['breeds'][0]['temperment']
                    }
                    const image = resultData[i]['url'];
                    const price = `${Math.floor(Math.random()) * 10 + 1}`;
                    const quantity = `${Math.floor(Math.random()) * 10 + 1}`;
                    const category = '61f85380462540330ae499f5'
                    
                    productData.push({
                        name,
                        description,
                        image,
                        price,
                        quantity,
                        category,
                    })
            }
            
         
        } catch (error) {
            console.log(error);
        }
        console.log(productData)
        const product = await Product.create(productData)
        })
        // console.log(product)
        // process.exit()
    })
