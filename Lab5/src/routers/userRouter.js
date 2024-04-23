const express = require('express');
const User = require('../../models/user');
const auth = require('../middleware/auth')
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get("/users",auth, async (req, res)=>{
    User.find({}).then((users)=> {
        res.status(200).send(users);
    }).catch((error)=>{
        res.status(500).send();
    })
});

router.get("/users/:id",auth,async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(500).send({ error: 'Користувача з вказаним ідентифікатором не знайдено' });
    }
    res.status(200).send(user);
});

router.post("/users",auth, async (req,res)=>{
    const { name, age, email, password } = req.body;
    const user = new User({ name, age, email, password});
    await user.save();
    if (!user) {
        return res.status(500).send({ error: 'Користувача з вказаним ідентифікатором не знайдено' });
    }
    res.status(200).send(user);
});

router.delete("/users/:id",auth, async (req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ NotFound: 'Не знайдено нічого' });
        }
        await user.deleteOne();
        res.status(200).send(user);
    } catch (error){
        console.error('Помилка',error);
        res.status(400).send();
    }
});

router.patch("/user/:id",auth, async (req,res)=>{
   try{
       const user = await User.findOne({_id: req.params.id});
       if (!user){
           res.status(404);
           throw new Error("Користувач не знайдено");
       }
       const fields = ["name", "age", "email", "password"];
       fields.forEach((field) =>{
          if (req.body[field]){
              user[field] = req.body[field];
          }
       })
       await user.save();
       res.json(user);
   }catch (error){
       res.send(error.message);
   }
});

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findOneByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});


router.post("/users/logout",auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !=req.token;
        })
        await req.user.save()
        res.send()
    }catch (e){
        res.status(500).send()
    }
});
router.post('/users/logoutAll',auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router;

