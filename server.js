const express = require('express');

const app = express.use();

app.get('/', (req, res, next) => {
    console.log('API Running');
    next();
})

const PORT = process.envc.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))