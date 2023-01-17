const router = require("express").Router();
const uuid = require("uuid");

const members = [
  { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
  { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
  { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
];

//postはあくまでもデータを取得するだけ、getで実際にそのデータを取得して表示させるみたいなイメージ

router.post("/", (req, res) => {
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  members.push(newData);

  // res.json(members);
  console.log(members.id);
  console.log(members.name);
  console.log(members.email);
  //Jsonを返す代わりにここにredirectする(データは読み込まれない、ページ遷移するだけ)
  res.redirect("/api/members");
});

//ejsにrenderさせる、第二引数はオブジェクト型、titleはヘッダーのejsから来てる。members:members(省略型)
router.get("/", (req, res) =>
  res.render("members", { members, title: "members" })
);

//これは個々のメンバー用の。ちょっと余力がありません
// router.get("/:id", (req, res) => {
//   const paramsID = req.params.id;

//   const found = members.some((member) => member.id === paramsID);

//   if (found) {
//     res.json(members.filter((member) => member.id === paramsID));
//   } else {
//     res.status(400).json({ msg: `Member with id: ${paramsID}, is not found ` });
//   }
// });

// res.render("members", { members });

module.exports = router;
