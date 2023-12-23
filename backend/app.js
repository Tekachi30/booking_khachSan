const session  = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors  = require("cors");
require('./config/connect');
const http = require('http');
const app = express();
const server = http.createServer(app)
const cron = require('node-cron');

// const {???} = require ('???')
const { routerUser } = require ('./routers/userRouter');
const { routerHotel } = require ('./routers/hotelRouter');
const { routerAdmin } = require ('./routers/adminRouter');
const { routerBanner } = require ('./routers/bannerRouter');
const { routerReport } = require ('./routers/reportRouter');
const { routerOwner } = require ('./routers/ownerRouter');
const { routerMessage } = require ('./routers/messageRouter');
const { routerRating } = require ('./routers/ratingRouter');
const { routerOrder } = require ('./routers/orderRouter');
const { routerCoupon } = require ('./routers/couponRouter');
const { routerRoom } = require ('./routers/roomRouter');
const { routerMail } = require ('./routers/mailRouter');
const { routerPay } = require ('./routers/payMentRouter');


// node cron

const mathlevelController = require('./controllers/mathlevelController')


// app.get('/api/level/get', async (req, res) => {
//   try {
//     const result = await mathlevelController.final_score();
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
// }
// });


// 0 1 1 * * 1h 1 tây hằng tháng
// const task = cron.schedule('* * * * *', () => {
//   mathlevelController.mathLevel()
// }, {
//   scheduled: true,
//   timeZone: 'Asia/Ho_Chi_Minh'
// });

// task.start()
// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

 
//session 
app.use(session({
  secret: 'keysaveloginuser123456', 
  resave: false,
  saveUninitialized: false 
}));
// app.use(cookieParser()); //Parse cookie
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());

app.use(routerUser, routerHotel, routerAdmin, routerBanner, routerReport,
   routerOwner, routerMessage, routerRating, routerOrder, routerCoupon, routerRoom, routerMail, routerPay);

// Server các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"))

const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
