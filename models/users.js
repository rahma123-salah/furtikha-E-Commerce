const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name: {
        type: 'string',
        required: true,
        minLength: 3
    },
    Email: {
        type: 'string',
        required: true,
    },
    Password: {
        type: 'string',
        required: true,
        minLength: 3
    },
    Address: {
        type: 'string',
        //required: true,
        minLength: 3
    },
    Country: {
        type: 'string',
        //required: true,
        minLength: 3
    },
    City: {
        type: 'string',
        //required: true,
        minLength: 3
    },
    Phone: {
        type: 'string',
        Length: 11
    },
    CardNumber: {
        type: 'string',
        Length: 11
    },
    Image: {
        type: 'string',
    },
    IsAdmin: {
        type: 'bool',
        default: '1.jpg'
        //required: true,
    },
    token: { 
        type: String 
    },
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;

// exports.addNewUser = (name, email, password, address, country, city, phone, cardNo, image) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect('mongodb://localhost:27017/Fruitkha')
//         .then(() => {
//             return User.findOne({ Email: email });
//         })
//     }).then(user => {
//         if(user) {
//             mongoose.disconnect()
//             reject("Email already exists");
//         }
//         else{
//             return bcrypt.hash(password, 10);
//         }
//     }).then((hashedPassword) => {
//         let user = new User({
//             Name: name,
//             Password: hashedPassword,
//             Email: email,
//             Address: address, 
//             Country: country, 
//             City: city, 
//             Phone: phone, 
//             CardNumber: cardNo, 
//             Image: image
//         })
//         return user.save();
//     }).then(() => {
//         mongoose.disconnect()
//         resolve();
//     }).catch((error) => {
//         mongoose.disconnect()
//         reject(error);
//     })
// }

