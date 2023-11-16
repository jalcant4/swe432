// server with node js
// imports the express library and sets an instance as an app
const express = require('express')
// mongo db is responsible for a NoSQL database
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const viewsRouter = require('./routes/router')
const apiRouter = require('./routes/api')
const PORT = 8080

async function main() {
    // connect to Mongodb
    await mongoose.connect('mongodb://localhost:27017/project', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // load the image schema data
    const Image = require('./models/image.js')

    // load instances of the image to the database
    const data = [
        {
            image: '/media/beerbongs&bentleys.jpg',
            alt: 'Beerbongs & Bentleys',
            content: 'BeerBongs & Bentleys was released by Post Malone on 2018',
        },
        {
            image: '/media/chase_atlantic.jpg',
            alt: 'Chase Atlantic',
            content: 'The eponymous album, Chase Atlantic, was released in 2017',
        },
        {
            image: '/media/ICYMI.jpg',
            alt: 'ICYMI',
            content: 'In Case You Missed It, ICYMI, by EDEN was released in 2022',
        },
        {
            image: '/media/hypochondriac.jpg',
            alt: 'hypochondriac',
            content: 'hypochondriac by brakence was released in 2022',
        },
        {
            image: '/media/overthinker.jpg',
            alt: 'Overthinker',
            content: 'Overthinker by INZO was released in 2018',
        },
    ]

    async function saveImagesToDatabase() {
        for (const instance of data) {
            const dbInstance = new Image({
                image: instance.image,
                alt: instance.alt,
                content: instance.content,
            });
    
            try {
                const savedImage = await dbInstance.save()
                console.log('Image saved:', savedImage)
            } catch (error) {
                if (error.code == 11000)
                    console.error('Duplicate key error. Image with this "image" value already exists.')
                else
                    console.error('Error saving image:', error)
            }
        }
    }
    
    // Call the function
    saveImagesToDatabase();

    // Serve static files from the /media directory
    app.use('/media', express.static(path.join(__dirname, 'media')))


    // rendering by a view engine: ejs
    app.set('view engine', 'ejs')
    app.set('views', './views')

    // middleware
    app.use(express.static(path.join(__dirname, 'public')))
    app.use("/views", viewsRouter)
     // Use the API router
    app.use('/api', apiRouter);

    // get methods retrieve a resource
    app.get("/", (req, res) => {
        res.render('index')
    })

    // listen to requests
    app.listen(PORT, () => console.log('Running express server on port:', PORT))
}

main().catch(err => console.log(err))