let Userdb = require("../model/model");
let Game = require("../model/model")
//let score = localStorage.getItem('score')

// CREATE AND SAVE NEW USER
exports.create = (req, res) => {
  // VALIDATE REQUEST
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  // NEW USER
  const user = new Userdb({
    username: req.body.username,
    email: req.body.email,
    password:req.body.password,
    password2:req.body.password2,
  });

  // MAKE SURE THE PASSWORDS MATCH
  if(user.password != user.password2) {
    res.redirect("/route/create_account");
  }else{
      // SAVE USER IN THE DATABASE
      user
        .save(user)
        .then((data) => {
          //res.send(data);
          res.redirect("/route/dashboard");
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occured while creating a create operation",
          });
        });
    }
};

exports.update = (req,res) => {
  if(!req.body) {
    return res.status(400).send({message:"can't be empty"})
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body)
}

exports.find = (req,res) => {
    Userdb.find()
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        res.status(500)
        .send(
            {meesage:err.message} || 'error occured'
        )
    })
}

exports.createGame = (req,res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
    const game = new Game({
      finalScore: req.body.finalScore,
      turns:{
        turn1Score:req.body.turns.turn1Score,
        turn2Score:req.body.turns.turn2Score,
        turn3Score:req.body.turns.turn3Score
      }
    })
    game
    .save(game)
    .then((data) => {
      res.send(data)
    })
}

exports.findGame = (req,res) => {
    Game.find()
    .then((game) => {
        res.send(game);
    })
    .catch((err) => {
        res.status(500)
        .send(
            {meesage:err.message} || 'error occured'
        )
    })
}
