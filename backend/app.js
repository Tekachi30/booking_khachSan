const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
require('./config/connect');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
  {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
  });

  const users = {};

  io.on('connection', (socket) => {
    socket.on('userConnected', (userId) => {
      users[userId] = socket.id;
      io.emit('UpdateUserStatus',users)
      console.log('User connected:', userId);
      console.log('Online users:', users);
    });
  
    socket.on('userDisconnect', (userId) => {
        delete users[userId];
        io.emit('Updatedisconnect',users)
        console.log('User disconnected:', userId);
        console.log('Online users:', users);
      
    });
  });
  
  
app.use((req, res, next) => {
  res.io = io
  next()
});

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

 

// app.use(cookieParser()); //Parse cookie
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  
}));

app.use(express.json());

app.use(routerUser, routerHotel, routerAdmin, routerBanner, routerReport,
   routerOwner, routerMessage, routerRating, routerOrder, routerCoupon, routerRoom, routerMail, routerPay);

// Server các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"))

const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`)
});
