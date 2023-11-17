ví dụ: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

# cú pháp 
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name seed-event
npx sequelize-cli db:seed:all

# note cơ bản
+ raw: true: Khi bạn đặt raw: true, Sequelize sẽ trả về dữ liệu dưới dạng mảng của các đối tượng JSON thay vì các đối tượng Sequelize. Điều này có nghĩa là dữ liệu sẽ không được Sequelize chuyển đổi thành các đối tượng Sequelize mà bạn đã định nghĩa, mà thay vào đó nó sẽ là các đối tượng JSON "đơn thuần".

+ nest: true: Tùy chọn này chỉ định liệu Sequelize có nên nhóm dữ liệu trả về theo các liên kết giữa các bảng hay không. Khi nest được đặt thành true, Sequelize sẽ nhóm các dữ liệu con (ví dụ: các ảnh của khách sạn trong truy vấn của bạn) vào bên trong các đối tượng của dữ liệu cha (ví dụ: thông tin về khách sạn). Nếu không có nest hoặc nếu nest được đặt là false, dữ liệu con sẽ được trả về dưới dạng các mảng riêng biệt.

+ required: true: Khi bạn đặt required: true, nó áp đặt điều kiện rằng kết quả trả về phải có ít nhất một kết quả. Nếu không có kết quả, Sequelize sẽ trả về một mảng trống. Nếu không có required hoặc nếu required là false, Sequelize sẽ trả về null nếu không có kết quả.

# Các loại phòng => cụ thể rõ ràng hơn cho KS QL
+ Single Bedroom (SGL): phòng 1 giường đơn cho 1 người.
+ Twin Bedroom (TWN): phòng 2 giường đơn cho 2 người.
+ Double Bedroom (DBL): phòng 1 giường đôi cho 2 người.
+ Triple Bedroom_1 (TRPL_1): phòng 1 giường đơn và 1 giường đôi 
+ Triple Bedroom_2 (TRPL_2): phòng 3 giường đơn