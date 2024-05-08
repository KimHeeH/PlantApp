// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userdbRouter = require('./Routes/userdbRoutes');
const userPlantdbRouter = require('./Routes/userPlantdbRoutes');
const plantdbRouter = require('./Routes/plantdbRoutes');
const PostdbRouter = require('./Routes/PostdbRoutes');
const CommentdbRouter = require('./Routes/CommentdbRoutes');
const userFavoritedbRoutes = require('./Routes/userFavoritedbRoutes');
const TagdbRoutes = require('./Routes/TagdbRouters');
const WeatherDataRouters = require('./Routes/WeatherDataRouter');
const userLocationRouters = require('./Routes/userLocationRouter');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors({
  origin: "http://서버주소"
}));

app.use(express.json());

app.use('/userdb', userdbRouter);

app.use('/userplantdb', userPlantdbRouter);

app.use('/plantdb', plantdbRouter);

app.use('/Postdb', PostdbRouter);

app.use('/commentdb', CommentdbRouter);

app.use('/userfavoritedb', userFavoritedbRoutes);

app.use('/tagdb', TagdbRoutes);

app.use('/weather', WeatherDataRouters);

app.use('/userlocationdb', userLocationRouters);

app.listen(port, () => {
  console.log('연결 완료', {port});
})