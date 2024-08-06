const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

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

router.get("/search", (req, res) => {
  const query = `SELECT Pname  FROM plantdb`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.get("/Pname", (req, res) => {
  const query = "SELECT Pname From plantdb";

  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
router.get("/test/Pname", (req, res) => {
  const name = req.query.name; // 클라이언트에서 전달한 name 값
  const query = `SELECT * FROM plantdb WHERE Pname = '${name}'`;

  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" }); // 오류 응답
    } else {
      res.json(result); // 결과 응답
    }
  });
});

router.get("/plantInfo", (req, res) => {
  const { Pname } = req.query;

  const query = "SELECT * FROM plantdb WHERE Pname Like ?";
  db.query(query, [Pname], (error, result) => {
    if (error) {
      res.status(500).json({ error: "에러" });
    } else {
      if (result.length > 0) {
        res.json(result);
        console.log(result);
      }
    }
  });
});

router.post("/plantType", (req, res) => {
  const { Pname } = req.body;

  const query = "SELECT PlantType FROM plantdb WHERE Pname = ?";
  db.query(query, [Pname], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});

router.post("/selectTag", (req, res) => {
  const { PlantType } = req.body;

  const query = "SELECT Pname, Image FROM plantdb WHERE PlantType = ?";
  db.query(query, [PlantType], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
router.post("/test", (req, res) => {
  const { mbti } = req.body; // 클라이언트에서 보낸 mbti 쿼리 매개변수를 추출
  const query = "SELECT Pname FROM plantdb WHERE MBTI LIKE ?";
  db.query(query, [`%${mbti}%`], (err, result) => {
    // mbti 변수 사용
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "An error occurred while fetching data" });
      return;
    }
    res.json({ recommendedPlants: result });
  });
});

module.exports = router;
