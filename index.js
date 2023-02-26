const express = require('express')
const mongoose = require('mongoose')
const model = require("./sechma.js")
const multer = require("multer")
const cors = require('cors')
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

// const url = "mongodb://127.0.0.1:27017/instaClone"
const uri = "mongodb+srv://root:ranjit@cluster0.ygkcdkc.mongodb.net/postData?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("MongoDB is Connected")
}, (err) => {
    console.log(err.message)
})
const storage = multer.memoryStorage()

const upload = multer({ storage: storage })
app.post("/upload", upload.single("image"), async (req, res) => {
    const saveData = new model({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        date: new Date().toLocaleDateString(),
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        }
    });
    try {
        await saveData.save();
        res.send({ message: "Image uploaded successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to upload image" });
    }
});

app.get('/', async (req, res) => {
    try {
        const user = await model.find()
        res.status(200).send(user);
    } catch (e) {
        console.log(e.message)
    }
}
)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`App listen on ${PORT}`)
})