const mongoose = require('mongoose');
const connection = require('../config/connection')
const { Product, User } = require('../models')
const {getRandomProduct, getRandomIndex} = require('./data')
const db = require('../config/connection').mongoURI;
const fetch = require('node-fetch')

let resultData;
// let saveCounter = 0;


mongoose.connect('open', async () => {

    console.log("connected")
    
    const url = ['https://api.thedogapi.com/v1/images/search']
    
    url.map(async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            
            resultData = [...json];
            const product = []

            console.log(resultData)
            console.log(resultData[0]['breeds'])
            
            
            for (let i = 0; i < 10; i++) {
                    // console.log(resultData[i]['breeds'][0])
                    // console.log(resultData[0]['breeds'])
                    const name = resultData[i]['breeds'][0].name;
                    const description = resultData[i]['breeds'][0].temperment;
                    const image = resultData[i].url;
                    const price = `${Math.floor(Math.random()) * 10}`;
                    const quantity = `${Math.floor(Math.random()) * 10}`;
                    const category = 'dog';

                    product.push({
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
        })
    })