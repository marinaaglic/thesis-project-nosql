const express = require("express");
const db = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const Profesor = require("./models/profesoriModel");
const Kolegij = require("./models/kolegijiModel");
const Status = require("./models/statusiModel");
const Student = require("./models/studentModel");
const session = require('express-session');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

//HOMEPAGE
app.get("/", (req, res) => {
  res.render("login");
});

//LOGOUT
app.get("/logout", (req, res) => {
  res.redirect("/");

})

app.post("/login", async function (req, res) {
  try {
    const profesor = await Profesor.findOne({ Korisnicko_ime: req.body.username }).populate("Kolegiji").exec();

    if (profesor) {
      const result = req.body.password === profesor.Lozinka;
      if (result) {
        const kolegijiNazivi = profesor.Kolegiji.map(kolegij => kolegij.Naziv);
        req.session.user = {
          username: req.body.username,
          kolegijiNazivi: kolegijiNazivi
        };
        res.redirect("/data");
      } else {
        res.status(400).json({ error: "Lozinka nije ispravna" });
      }
    }
    else {
      res.status(400).json({ error: "Korisnik ne postoji" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/data", async (req, res) => {
  if (req.session.user) {
    try {
      const selectedKolegij = req.query.cmb;
      const startTime = performance.now();
      const statusData = await Status.find({ "Kolegij.Kolegij": selectedKolegij });
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log("Stored procedure execution time (getStatusi): " + executionTime + " ms");
      res.render("data.ejs", {
        username: req.session.user.username,
        kolegijiNazivi: req.session.user.kolegijiNazivi,
        statusData: statusData,
        selectedKolegij: selectedKolegij
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/login");
  }
});


// app.get("/data", async (req, res) => {
//   if (req.session.user) {
//     try {
//       const startTime = performance.now();
//       const statusData = await Status.find({});
//       const endTime = performance.now();
//       const executionTime = endTime - startTime;
//       console.log("Query execution time: " + executionTime + " ms");
//       res.render("data.ejs", {
//         username: req.session.user.username,
//         kolegijiNazivi: req.session.user.kolegijiNazivi,
//         statusData: statusData,
//         selectedKolegij: null
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.redirect("/login");
//   }
// });


//PRIKAZ INFO ODABRANOG STUDENTA
app.get("/getStudentInfo", async (req, res) => {
  const jmbag = req.query.jmbag;
  try {
    const startTime = performance.now();
    const studentInfo = await Student.findOne({ JMBAG: jmbag });
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log("Stored procedure execution time (getInfo): " + executionTime + " ms");
    res.json(studentInfo);
  } catch (err) {
    console.error('Error fetching student info:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteStatus/:id", async (req, res) => {
  const statusId = req.params.id;
  try {
    const startTime = performance.now();
    await Status.findOneAndRemove(statusId);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log("Stored procedure execution time (deleteStatus): " + executionTime + " ms");
    res.json({ success: true })
  } catch (err) {
    console.log("Error deleting row: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put('/updateOcjena/:id', async (req, res) => {
  const statusId = req.params.id;
  const { ocjena } = req.body;

  try {
    const startTime = performance.now();
    const status = await Status.findById(statusId);

    if (!status) {
      return res.json({ success: false, error: 'Status not found.' });
    }
    status.Ocjena = ocjena;
    await status.save();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log("Stored procedure execution time (updateOcjena): " + executionTime + " ms");
    res.json({ success: true, updatedStatus: status });

  } catch (error) {
    console.error('Error while updating:', error);
    res.json({ success: false, error: 'Error while updating.' });
  }
});


app.listen(PORT, function () {
  console.log("Server is running");
})
