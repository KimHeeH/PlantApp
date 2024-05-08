const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/login', (req, res) => {
    const { id, pw } = req.body;
  
    const query = "select * from userdb where id = ? and pw = ?";
    db.query(query, [id, pw] ,(error, result) => {
  
      if(error) throw error;
  
      if (result.length > 0) {
        res.json({ id: result[0].id, pw: result[0].pw });      
      } else {
        res.json({ message: "로그인 실패", error });
      }
    });
});
  
router.post('/CheckuserId', (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.json({ message: '아이디를 입력해 주세요.' });
    }
  
    const query = "SELECT * FROM userdb WHERE id = ?";
    db.query(query, [id], (error, result) => {
      if(error) {
        console.log(error);
      } else {
        if(result.length > 0) {
          res.json({ message: "이미 사용 중인 아이디입니다." });
        } else if (result.length === 0) {
          res.json({ message: "사용 가능한 아이디입니다." });
        } 
      }
    });
});
  
router.post('/CheckNickname', (req, res) => {
    const { Nname } = req.body;
  
    if(!Nname) {
      return res.json({ message: "닉네임을 입력해 주세요." });
    }
  
    const query = "select * from userdb where Nname = ?";
    db.query(query, [Nname], (error, result) => {
      if(error) {
        console.log(error);
      } else {
        if(result.length > 0) {
          res.json({ message: "이미 사용 중인 닉네임입니다." });
        } else if (result.length === 0) {
          res.json({ message: "사용 가능한 닉네임입니다." })
        }
      }
    });
});
  
router.post('/insert', (req, res) => {
    const { id, pw, name, Phone, Nname } = req.body;
    const RegDate = new Date();
  
    const query = "insert into userdb (id, pw, name, Phone ,Nname, RegDate) values (?, ?, ?, ?, ?, ?)";
  
    db.query(query, [id, pw, name, Phone, Nname, RegDate], (err, result) => {
      if (err) {
        console.log("회원가입 에러");
        res.status(500).json({ message: '회원가입 실패' });
      } else {
        res.status(200).json({ message: "회원가입 성공" });
      }
    })
});
  
router.post('/delete', (req, res) => {
    const { id } = req.body;
  
    const query = "delete from userdb where id = ?";
    db.query(query, [ id ], (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).json({ message: err, error: err });
      } else {
        res.status(200).json({ message: '회원 탈퇴 성공' });
      }
    })
});
  
router.post('/update', (req, res) => {
    const { Nname, id } = req.body
  
    const query = "update userdb set Nname = ? where id = ?";
    db.query(query, [Nname, id], (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).json({ message: '데이터 수정 실패' });
      } else {
        res.status(200).json({ message: '데이터 수정 성공' });
      }
    })
});
  
router.post('/FindingId', (req, res) => {
    const { name, Phone } = req.body;
  
    const query = "select id, date_format(RegDate, '%Y년 %m월 %d일') as RegDate from userdb where name = ? and Phone = ?";
    db.query(query, [name, Phone], (error, result) => {
      if(error) {
        console.log("아이디 찾기 실패");
      } else {
        console.log("아이디 찾기 성공");
      }
      res.json(result);
    })
});
  
router.post('/FindingPw', (req, res) => {
    const { id, name, Phone } = req.body;
  
    const query = "select * from userdb where id = ? and name = ? and Phone = ?";
    db.query(query, [id, name, Phone], (error, result) => {
      if(error) {
        console.log("비밀번호 찾기 실패");
      } else {
        console.log("비밀번호 찾기 성공");
      }
      res.json(result);
    })
});
  
router.post('/EditPw', (req, res) => {
    const { id, pw } = req.body;
  
    const query = "update userdb set pw = ? where id = ?";
    db.query(query, [pw, id], (error, result) => {
      if(error) {
        console.log(error);
      } else {
        console.log("비밀번호 변경 완료");
      }
      res.json(result);
    })
});
  
router.post("/userNname", (req, res) => {
    const { Nname } = req.body;
  
    const query = "select id from userdb where Nname = ?";
    db.query(query, [Nname], (error, result) => {
      if(error) {
        console.log("에러요");
      } else {
        console.log("에러 아님");
      }
      res.json(result);
    })
});
  
router.post("/userId", (req, res) => {
    const { id } = req.body;
  
    const query = "SELECT * FROM userdb WHERE id = ?";
    db.query(query, [id], (error, result) => {
      if(error) {
        console.log(error);
      } else {
        if(result.length > 0) {
          res.json({ id: result[0].id, Nname: result[0].Nname })
        }
      }
    })
})

module.exports = router;