/** 
 * @desc 서버 및 DB 연동
 * @auth hy
 * @since 2022.08.23
 * */ 

 const express = require("express");
 const cors = require('cors')
 const app = express();
 const port = 4000;
 const mysql = require('mysql');
 const bodyParser = require('body-parser');
 
 
 /** mysql db connection 설정  */ 
 const connection = mysql.createConnection({
   host: 'luves9631.cafe24.com',
   user: 'luves9631',
   password: 'cool4961*',
   database: 'luves9631',
   port: '3306',
   multipleStatements: true,    // 데이터가 buffer로 전송되는 문제 해결 위해 추가
     typeCast: function (field, next) {
         if (field.type == 'VAR_STRING') {
             return field.string();
         }
         return next();
   }
 });
 
 connection.connect();
 
 app.use(cors());   // 클라이언트 CORS 문제 해결 위해 추가
 app.use(bodyParser.urlencoded({extended:true}));   // req.body가 undefined 되는 문제 해결 위해 추가
 app.use(bodyParser.json());
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 });
 
 
 app.get("/", (req, res) => {
   res.send("서버 실행중");
 });
 
 
 /** api 설정 */
 
 // 상품 데이터 가져오기
 app.get("/api/products", (req, res) => {    
   connection.query("SELECT * FROM TBGM_PRODUCT", function (err, results) {
     if (err) {
       console.log("데이터 가져오기 실패");
     } else {
       console.log(results);
       res.send(results);
     }
   });
 });
 
 
 // 상품 데이터 등록
 app.post("/api/register", (req, res) => {
   const data = req.body;
   let insertArr = [];
 
   for (let key in data) {
     console.log(data[key]);
     insertArr.push(data[key]);
   }
 
   connection.query("INSERT INTO TBGM_PRODUCT (PRODUCT_NM, PRODUCT_SUMMARY, ITEM_PRICE, CATEGORY, BRAND_CD, BRAND_NM) VALUES (?, ?, ?, ?, ?, ?)", insertArr, function (err, rows, fields) {
     if (err){
         res.send(err);
         console.log(err);
         console.log("상품정보 등록 실패");
     } else{
         res.send({errCode: 0});
         console.log(rows);
         console.log("상품정보 등록 성공");
     };
   });
   
 });