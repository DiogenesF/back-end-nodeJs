const mongoose = require("mongoose");

const Dishes = require("./model/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

connect.then((db) => {
    console.log("Connected correctly to server");

    Dishes.create({
        name: "Uthappizza",
        description: "test"
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {description: "Updated test"},
            },{
                new:true
            }).exec()
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: "I am getting a sinking feeling!",
                author: "Leonardo di Carpaccio"
            });

            return dish.save();
        })
        .then((dish) => {
            console.log(dish)

            return Dishes.deleteOne({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
})
    .catch((err) => {
        console.log(err);
    });