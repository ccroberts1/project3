const userData = require("./userData.json");
const mongoose = require('mongoose');
const connection = require('../config/connection')
const { Product, User } = require('../models')
// const db = require('../config/connection').mongoURI;
const fetch = require('node-fetch')
const CreateCategories = require("./categorySeed")

let resultData;
// let saveCounter = 0;

CreateCategories()

connection.once('open', async () => {
    await User.deleteMany({});
    const users = await User.insertMany(userData)
    console.log("Users seeded");

    await Product.deleteMany()

    console.log("connected")
    
    const dogUrl = ['https://api.thedogapi.com/v1/images/search?limit=20&page=10&order=Desc&mime_types=jpg,png']
    
    const productData = []

    dogUrl.map(async dogUrl => {
        try {
            const response = await fetch(dogUrl);
            const json = await response.json();
            
            resultData = [...json];

            // console.log(resultData)
            // console.log(resultData[0]['breeds'])
            
            
            for (let i = 0; i < 20; i++) {
                    // console.log(resultData[i]['breeds'][0])
                    // console.log(resultData[i])
                    // console.log(resultData[0]['breeds'])
                    let name;
                    let description;
                    if(resultData[i] === undefined || resultData[i]['breeds'][0] === undefined) {
                        name = 'Spot'
                    } else {
                        name = resultData[i]['breeds'][0]['name'];
                    }
                     if(resultData[i] === undefined || resultData[i]['breeds'][0] === undefined || resultData[i]['breeds'][0]['temperment'] === undefined) {
                        description = 'Good dog'
                    } else {
                        description = resultData[i]['breeds'][0]['temperment']
                    }
                    const image = resultData[i]['url'];
                    const price = `${Math.floor(Math.random() * 100) + 1}`;
                    const quantity = `${Math.floor(Math.random() * 10) + 1}`;
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

        const catUrl = ['https://api.thecatapi.com/v1/images/search?limit=20&page=10&order=Desc&mime_types=jpg,png']
         catUrl.map(async catUrl => {
        try {
            const response = await fetch(catUrl);
            const json = await response.json();
            
            resultData = [...json];

            // console.log(resultData)
            // console.log(resultData[1]['breeds'])
            
            
            for (let i = 0; i < 20; i++) {
                    // console.log(resultData[i]['breeds'][0])
                    // console.log(resultData[i])
                    // console.log(resultData[0]['breeds'])
                    let name;
                    let description;
                    if(resultData[i] === undefined || resultData[i]['breeds'][0] === undefined) {
                        name = 'Mittens'
                        description = 'good kitty'
                    } else {
                        name = resultData[i]['breeds'][0]['name'];
                        description = resultData[i]['breeds'][0]['temperment']
                    }
                    const image = resultData[i]['url'];
                    const price = `${(Math.floor(Math.random() * 100)) + 1}`;
                    const quantity = `${(Math.floor(Math.random() * 10)) + 1}`;
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
