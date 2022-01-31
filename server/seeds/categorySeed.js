const mongoose = require('mongoose');
const connection = require('../config/connection')
const { Product, User, Category } = require('../models')
// const db = require('../config/connection').mongoURI;
const fetch = require('node-fetch')

connection.once('open', async () => {
    await Category.deleteMany()
    console.log('connected')

    const categoryData = [{name: 'dogs'}, {name: 'cats'}]

    const category = await Category.insertMany(categoryData)
})