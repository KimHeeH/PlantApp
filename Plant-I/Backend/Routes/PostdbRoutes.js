const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.get("/select", (req, res) => {
    const Category = req.query.Category;
  
    const query = "select * from Postdb where Category = ? order by RegDate desc";
    db.query(query, [Category], (err, result) => {
      if (err) {
        console.log('조회 오류');
        res.status(500).json({ message: "조회 오류" });
        return;
      } 
      res.json(result);
    });
});
  
router.post("/insert", (req, res) => {
    const { Id, Writer, Title, Content, Category } = req.body;
    const RegDate = new Date();
  
    const query = "insert into Postdb (Id, Writer, Title, Content, Category ,RegDate) values (?, ?, ?, ?, ?, ?)";
    db.query(query, [Id, Writer, Title, Content, Category, RegDate], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: '작성 실패' });
      } else {
        res.status(200).json({ message: '작성 성공' })
      }
    })
});
  
router.post("/delete", (req, res) => {
    const { Id, Writer, Title, Content } = req.body;
  
    const query = "delete from Postdb where Id = ? and Writer = ? and Title = ? and Content = ?";
    db.query(query, [Id, Writer, Title ,Content], (error, result) => {
      if (error) {
        console.log("게시글 삭제 실패");
      } else {
        console.log("게시글 삭제 성공");
      }
      res.json(result);
    })
});
  
router.post("/update", (req, res) => {
      const { Id, Writer, Title, Content, RegDate } = req.body;
  
      let query = "update Postdb set ";
      const params = [];
  
      if(Title !== undefined) {
        query += "Title = ?,";
        params.push(Title);
      }
  
      if(Content !== undefined) {
        query += "Content = ?";
        params.push(Content);
      }
  
      query += "where Id = ? and Writer = ? and RegDate = ?";
      params.push(Id);
      params.push(Writer);
      params.push(RegDate);
  
      db.query(query, params, (error, result) => {
        if(error) {
          console.log(error)
        } else {
          console.log("수정 완료");
        }
        res.json(result);
      })
});

module.exports = router;