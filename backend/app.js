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
  const owners = {}
  
  io.on('connection', (socket) => {
    socket.on('userConnected', (userId) => {
      users[userId] = socket.id;
      console.log('User connected:', userId);
      console.log('Online users:', users);
    });
  
    socket.on('userDisconnect', (userId) => {
        delete users[userId];
        console.log('User disconnected:', userId);
        console.log('Online users:', users);
      
    });

    socket.on('ownerConnected', (ownerId) => {
      owners[ownerId] = socket.id;
      console.log('owner connected:', ownerId);
      console.log('Online owners:', owners);
    });
  
    socket.on('ownerDisconnect', (ownerId) => {
        delete owners[ownerId];
        console.log('owner disconnected:', ownerId);
        console.log('Online owners:', owners);
      
    });
  });
  
  
  app.use((req, res, next) => {
    res.io = io
    next()
});
// node cron
const cron = require('node-cron');

const mathlevelController = require('./controllers/mathlevelController')


// app.get('/api/level/get', async (req, res) => {
//   try {
//     const result = await mathlevelController.mathLevel();
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
// }
// });


//// 0 1 1 * * 1h 1 tây hằng tháng
// const task = cron.schedule('* * * * *', () => {
//   mathlevelController.mathLevel()
// }, {
//   scheduled: true,
//   timeZone: 'Asia/Ho_Chi_Minh'
// });

// task.start()

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
// const { routerDash } = require ('./routers/dashboardRouter');
const { routerDashboard } = require ('./routers/dashboardRouter');

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());

// Định tuyến

app.use(routerUser, routerHotel, routerAdmin, routerBanner, routerReport, routerDashboard,
  routerOwner, routerMessage, routerRating, routerOrder, routerCoupon, routerRoom, routerMail, routerPay);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));


const port = 3000;
server.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
