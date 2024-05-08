const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.get("/plantData", (req, res) => {
    const query = "select * from plantdb";
  
    db.query(query, (err, rows) => {
      if (err) {
        console.error("Error fetching plant data:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(rows);
    });
});
  
router.get('/search', (req, res) => {

    const query = `SELECT Pname, Image FROM plantdb`;
    db.query(query, (err, result) => {
      if(err) {
        console.log(err)
      }
      res.json(result);
    });
});


router.get('/Pname', (req, res) => {
  const query = "SELECT Pname From plantdb";

  db.query(query, (error, result) => {
    if(error) {
      console.log(error);
    }
    res.json(result);
  })
})
  
router.get("/plantInfo", (req, res) => {
    const { Pname } = req.query;
  
    const query = "SELECT * FROM plantdb WHERE Pname Like ?";
    db.query(query, [Pname], (error, result) => {
      if(error) {
        res.status(500).json({error: "에러"});
      } else {
        if(result.length > 0) {
          res.json(result);
          console.log(result);
        }
      }
    })
});

router.post("/plantType", (req, res) => {
  const { Pname } = req.body;

  const query = "SELECT PlantType FROM plantdb WHERE Pname = ?";
  db.query(query, [Pname], (error, result) => {
    if(error) {
      console.log(error);
    }
    res.json(result);
  })
})

router.post("/selectTag", (req, res) => {
  const { PlantType } = req.body;

  const query = "SELECT Pname, Image FROM plantdb WHERE PlantType = ?";
  db.query(query, [PlantType], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result);
  })
})

module.exports = router;