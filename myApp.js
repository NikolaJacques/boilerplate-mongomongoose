const express = require('express'); 
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const absolutePath = __dirname + '/views/index.html';
app.get('/', (req,res) => {
    res.sendFile(absolutePath);
});

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Bob',
    age: 45,
    favoriteFoods: ['pizza', 'spaghetti']
  });
  person.save((err, data) => {
    if (err) return console.error(error);
    done(null, data);
  });
};

const arrayOfPeople = [
    {
      name: 'Bob',
      age: 45,
      favoriteFoods: ['hamburgers', 'french fries']
    },
    {
      name: 'Liz',
      age: 25,
      favoriteFoods: ['pizza', 'spaghetti']
    },
    {
      name: 'Howard',
      age: 62,
      favoriteFoods: ['turkey sandwich', 'eggs benedict']
    }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(error);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, matches) => {
    if (err) return done(err);
    done(null , matches);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, matches) => {
    if (err) return done(err);
    done(null , matches);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, match) => {
    if (err) return done(err);
    done(null, match);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person
    .findById(personId, (err, person) => {
      if (err) return done(err);
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data) => {
          if (err) return done(err);
          done(null, data);
      });
    });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age:ageToSet},{new: true}, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods: foodToSearch})
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data)=>{
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
