var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../db/db");

//Get Mission
router.get("/", function (req, res, next) {
  db.all("SELECT * FROM MissionPlan", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "error" });
      return;
    }
    res.json(rows);
  });
});

//create mission
router.post("/", function (req, res, next) {
  db.run(
    `INSERT INTO MissionPlan(planName, g3wp) VALUES (?, ?)`,
    [req.body.namaMisi, req.body.geoJSON],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ prompt: "error" });
        return;
      }
      res.status(200).send({ status: "mission create" });
    }
  );
});

//delete a mission
router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  db.run(`DELETE FROM MissionPlan WHERE planId = ${id}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "error",
      });
    }
    res.status(200).send("delete");
  });
});

//edit a mission
// router.get("/update", function (rec, res) {
//   let id = req.params.id;
//   db.run(`UPDATE (planName, g3wp) FROM MissionPlan VALUE(?,?)`, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send({ prompt: "error" });
//       return;
//     }
//     res.status(200).send({ status: "mission update" });
//   });
// });
module.exports = router;
