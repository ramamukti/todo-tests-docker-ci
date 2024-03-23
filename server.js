import app from './app.js';

const port = 3000;
app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log(`Server is running on port ${port}.`)
    }
});