//初期設定みたいなやつ

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

/* ---------------------------- setups and config --------------------------- */
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

///
app.set("view engine", "ejs");
app.set("views", "src/views");
///

/* ------------------------------- middleware ------------------------------- */
app.use("/api/members", require("./routes/members"));
app.get("/", (req, res) => res.render("homepage", { title: "Homepage" }));


app.post("/api/members", (req, res, next) => {
  console.log(req.body);
  const { name, email } = req.body;
  if (name === "admin" && email === "admin") {
    res.render("members", {
      title: `Welcome, ${name}`,
      username: "",
      name: "Member lists",
    });
  } else {
    res.render("api/failure", { title: "Opps!" });
  }

  res.redirect("/");
});

app.use((req, res) => res.sendFile(path.join(__dirname, "public", "404.html")));

/* -------------------------------- listener -------------------------------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serever is listening on ${PORT}🚀`));
