const express = require('express');
const app = express();
const port = 3000;
// const sequelize = require('sequelize');

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

const test = require('./layers/test.router');
app.use('/test', test);

const { sequelize } = require('./models');
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('db connect success');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@! 포트 번호는~!!~' + port + '번 입니다~!');
});
