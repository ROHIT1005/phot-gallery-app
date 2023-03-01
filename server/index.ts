import express, { urlencoded } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import {ArtModel} from './models/schemas';

// Initialize the express engine
const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
 
// Take a port 3000 for running server.
const port: number = 3001;

mongoose
  .connect(
    "mongodb+srv://rohitshreenivas:rohitshreenivas@cluster0.ge7aa9i.mongodb.net/photosdb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const path = require("path");

const checkFileType = function (file: any, cb: any) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }, 
});

app.post('/uploadArt', upload.single('testImage'), (req, res) => {
    const saveImage = new ArtModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync('uploads/' + req.file?.filename),
            contentType: "image/png"
        },
        artist: req.body.artist,
        buyer: req.body.buyer
    });
    saveImage.save()
    .then((res) => {console.log("image is saved!")})
    .catch((err) => {console.log(err, "error has occurred")});
    res.send('image is uploaded!');
});

app.patch('/addBuyer', async (req, res) => {
    const filter = { name: req.body.artname};
    const update = { buyer: req.body.buyer};

    await ArtModel.findOneAndUpdate(filter, update, {new: true}).then((update) => {
        console.log("success");
        res.send(update);
    }).catch(err => {
       console.log("err", err);
       res.status(500).send(err);
    });
});

app.get('/byArtist', async (req, res) => {
    const artistImages = await ArtModel.find({artist: req.query.artistname});
    res.json(artistImages);
})

app.get('/allImages', async (req, res) => {
    const allImages = await ArtModel.find();
    res.json(allImages);
});

app.delete('/deleteImg/:name', async (req, res) => {
    const imageName = req.params.name;

    await ArtModel.deleteOne({name: imageName}).then((imageName) => {
        console.log("image deleted: ", imageName);
        res.send("image deleted!");
    }).catch(err => {
        console.log("err", err);
        res.status(500).send(err);
    })
})
 
// Server setup
app.listen(port, () => {

    console.log(`TypeScript with Express 

         http://localhost:${port}/`);
});