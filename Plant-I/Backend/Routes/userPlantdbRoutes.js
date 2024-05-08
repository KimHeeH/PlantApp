const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.get('/select', (req, res) => {
    const userId = req.query.id;
  
    if (userId) {
      const query = 'select * from userplantdb where Id = ?';
      db.query(query, [userId] ,(error, result) => {
        if (error) throw err;
        res.json(result);
      });
    }
});
  
router.post('/insert', (req, res) => {
    const { Id, Pname, PNname, Plant_Date, Place, Image } = req.body;
  
    const query = "insert into userplantdb(Id, Pname, PNname, Plant_Date, Place, Image) values(?, ?, ?, ?, ?, ?)";
    db.query(query, [Id, Pname, PNname, Plant_Date, Place, Image] ,(err, result) => {
  
      if (err) {
        console.error('insert 에러', err);
        res.status(500).json({ message : '데이터 저장 실패' });
      } else {
        res.status(200).json({ message : '데이터 저장 성공' });
      }
    });
});
  
router.put('/update', (req, res) => {
    const { No ,Id , pname ,pnname, Plant_Date, Place } = req.body;
  
    let query = "update userplantdb set ";
    const params = [];
    
    if (pnname !== undefined) {
      query += "pnname = ?,";
      params.push(pnname);
    }
  
    if (Plant_Date !== undefined) {
      query += "Plant_Date = ?,";
      params.push(Plant_Date);
    }
  
    if (Place !== undefined) {
      query += "Place = ?,";
      params.push(Place);
    }
  
    if (params.length > 0) {
      query = query.slice(0, -1);
    }
  
    query += " where No = ? and Id = ? and pname = ?";
    params.push(No)
    params.push(Id);
    params.push(pname);
  
    //console.log(query, params);
  
    db.query(query, params, (err, result) => {
      if(err) {
        console.log('update 에러');
        res.status(500).json({ message: '데이터 수정 실패' });
      } else {
        res.status(200).json({ mesaage: '데이터 수정 성공' });
      }
    });
});
  
router.delete('/delete', (req, res) => {
    const { No ,Id, pname, pnname, Plant_Date, Place } = req.body;
  
    const query = "delete from userplantdb where No = ? and Id = ? and pname = ? and pnname = ? and Plant_Date = ? and Place = ?";
    db.query(query, [ No, Id, pname, pnname, Plant_Date, Place], (err, result) => {
      if (err) {
        console.log('delete 에러');
        res.status(500).json({ message: '데이터 삭제 실패', error: err });
      } else {
        res.status(200).json({ message: '데이터 삭제 성공' });
      }
    })
})

module.exports = router;