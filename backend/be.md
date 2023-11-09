ví dụ: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

database:
npx sequelize-cli model:generate --name User --attributes account:string,fullname:string,address:string,sex:enum,phone:string,password:string,email:string //

npx sequelize-cli model:generate --name admin --attributes account:string,password:string //

npx sequelize-cli model:generate --name owner --attributes account:string,fullname:string,address:string,phone:string,password:string,email:string //

npx sequelize-cli model:generate --name hotel --attributes name_hotel:string,address:string,city_code:integer,district_code:integer,ward_code:integer,id_owner:integer,information:string //

npx sequelize-cli model:generate --name room_hotel --attributes id_hotel:integer,type_room:enum,total_quanlity:integer,real_quanlity:integer,price:integer //

npx sequelize-cli model:generate --name img_room --attributes public_id:string,url:string,id_room:integer //

npx sequelize-cli model:generate --name img_hotel --attributes public_id:string,url:string,id_hotel:integer //

npx sequelize-cli model:generate --name rating_hotel --attributes id_hotel:integer,id_user:integer,score_rating:double,comment_rating:string //

npx sequelize-cli model:generate --name img_rating --attributes public_id:string,url:string,id_rating:integer //

npx sequelize-cli model:generate --name favorate_hotel --attributes id_hotel:integer,id_user:integer //

npx sequelize-cli model:generate --name report_hotel --attributes id_hotel:integer,id_user:integer,comment_report:string //

npx sequelize-cli model:generate --name img_report --attributes public_id:string,url:string,id_report:integer //

npx sequelize-cli model:generate --name banner --attributes title_banner:string,content_banner:string //

npx sequelize-cli model:generate --name messager --attributes id_user:integer,id_owner:integer,messager:string,deleted:integer //

npx sequelize-cli model:generate --name order --attributes id_user:integer,status:enum,provider:enum //

npx sequelize-cli model:generate --name order_detail --attributes id_order:integer,id_room:integer,quanlity:integer,sigle_price:integer //

npx sequelize-cli model:generate --name notification --attributes title_noti:string,content_noti:string,id_user:integer //

npx sequelize-cli model:generate --name coupon_owner --attributes id_hotel:integer,code_coupon:string,discount:integer,date_coupon:datetime