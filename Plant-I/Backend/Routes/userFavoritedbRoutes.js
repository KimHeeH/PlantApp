const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post("/like", (req, res) => {
    const { Id, Pname } = req.body;
  
    const query = "INSERT INTO userfavoritedb (Id, Pname, isliked) VALUES (?, ?, 'Yes')";
    db.query(query, [Id, Pname], (err, result) => {
        if (err) {
        console.log(err);
        } else {
            console.log("Inserted row:", result);
        }
        res.json(result)
    });
});
  
router.post("/unlike", (req, res) => {
    const { Id, Pname } = req.body;

    const query = "DELETE FROM userfavoritedb WHERE Id = ? AND Pname = ?";
    db.query(query, [Id, Pname], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.json(result);
    })
});

router.post("/checkLike", (req, res) => {
    const { Id, Pname } = req.body;

    const query = "SELECT * FROM userfavoritedb WHERE Id = ? and Pname = ?";
    db.query(query, [Id, Pname], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.json(result);
    })
})
  
router.get("/liked", (req, res) => {
    const { Id, type } = req.query; // req.query에서 userID와 type 가져오기
    let query;
    let params;
      
    if (type === "전체") {
        query = `
        SELECT userfavoritedb.*, plantdb.Image 
        FROM userfavoritedb INNER JOIN plantdb ON 
        userfavoritedb.pname = plantdb.pname WHERE userfavoritedb.Id = ?
        `;
        params = [Id];
    } else {
        query = `
        SELECT userfavoritedb.Pname, plantdb.Image
        FROM userfavoritedb INNER JOIN plantdb ON
        userfavoritedb.Pname = plantdb.Pname WHERE userfavoritedb.Id = ? AND plantdb.PlantType = ?
        `;
        params = [Id, type];
    }
      
    db.query(query, params, (error, result) => {
      if (error) {
        console.error("Error fetching liked plants:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
        }
      
        res.json(result)
    });
});
  
router.post("/select", (req, res) => {
    const { Id } = req.body;
  
    const query = "SELECT userfavoritedb.*, plantdb.Image FROM userfavoritedb INNER JOIN plantdb ON userfavoritedb.pname = plantdb.pname WHERE userfavoritedb.Id = ?";
    db.query(query, [Id], (error, result) => {
      if(error) {
        console.log(error);
      } else {
        if(result.length > 0) {
          res.json(result);
        }
      }
    })
});

module.exports = router;