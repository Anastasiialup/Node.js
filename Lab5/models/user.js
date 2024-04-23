const jwt = require('jsonwebtoken');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// const contains = require("validator/es/lib/contains");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        default: 0,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: "Ваш вік повинен бути тільки додатнім значеням"
        }
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: "Неправильний формат електронної пошти"
        },
        unique: true,
        set: function(value) {
            return value.toLowerCase();
        }
    },
    password:{
        type: String,
        require: true,
        minlength: [7, "Пароль повинен містити принаймні 7 символів"],
        trim: true,
        validate: {
            validator: function(value) {
                return !value.toLowerCase().includes('password');
            },
            message: 'Пароль не повинен містити слово "password"'
        }

    },
    tokens:[{
        token: {
            type: String,
            require: true
        }
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findOneByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({_id: user._id.toString()},'kdweueksdsjfij');

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
};



const User = mongoose.model('User',userSchema);


const user = new User({name:'Gaz', age:28, email: 'gaz@student.ztu.edu.ua', password:'0412510302'});


user.save().then(()=>{
console.log(user);
}).catch((error) => {
console.log(error);
});

module.exports = User;
