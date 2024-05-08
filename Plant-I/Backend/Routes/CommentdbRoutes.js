const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/insert', (req, res) => {
    const { Post_Id, User_Id, Content } = req.body;
    const RegDate = new Date();
  
    const query = "insert into Commentdb (Post_Id, User_Id, Content, RegDate) values (?, ?, ?, ?)";
    db.query(query, [Post_Id, User_Id, Content, RegDate], (error, result) => {
      if(error) {
        res.status(500).json({ message : error })
      } else {
        console.log(result);
      }
      res.json(result);
    })
});
  
router.post("/select", (req, res) => {
    const { Post_Id } = req.body;
  
    const query = "SELECT * FROM Commentdb WHERE Post_Id = ?";
    db.query(query, [Post_Id], (error, result) => {
      if(error) {
        console.log(error);
      } else {
      }
      res.json(result);
    });
});

module.exports = router;