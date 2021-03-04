const express = require('express')
const mongoose = require('mongoose')
const root = require('path').join(__dirname, 'client', 'build')

const app = express();

app.use(express.static(root));

app.use(express.json())
app.use(express.static('/client/build'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link',require('./routes/link.routes'))
app.use('/t',require('./routes/redirect.routes'))

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})


const start = async() => {
    try {

        await mongoose.connect(require('./config').mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`server started PORT - ${port}`)
        })

    } catch (e) {
        console.log(e.message);
        setTimeout(start,10000);
    }
};
start();
