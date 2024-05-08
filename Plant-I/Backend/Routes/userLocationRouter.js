const express = require('express');
const router = express.Router();
const db = require('../dbConnection');


router.post('/locationInfo', (req, res) => {
    const {Id, lat, lon} = req.body;

    const checkQuery = "SELECT * FROM userlocationdb where Id = ?";
    db.query(checkQuery, [Id], (error, result) => {
        if(error) {
            console.log(error);
            return;
        }
        
        if(result.length > 0) {
            const updateQuery = "UPDATE userlocationdb SET lat = ?, lon = ? WHERE Id = ?";
            db.query(updateQuery, [lat, lon, Id], (error, result) => {
                if(error) {
                    console.log(error);
                    return;
                }
                res.json(result);
            })
        } else {
            const insertQuery = "INSERT INTO userlocationdb (Id, lat, lon) VALUES (?, ?, ?)";
            db.query(insertQuery, [Id, lat, lon], (error, result) => {
                if(error) {
                    console.log(error);
                    return
                }
                res.json(result);
            });
        }
    });
});

router.post('/select', (req, res) => {
    const {Id} = req.body;

    const query = "SELECT lat, lon FROM userlocationdb WHERE Id = ?";
    db.query(query, [Id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.json(result);
    });
});

module.exports = router;