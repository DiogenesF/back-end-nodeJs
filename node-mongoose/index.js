const mongoose = require("mongoose");

const Dishes = require("./model/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

connect.then((db) => {
    console.log("Connected correctly to server");

    var newDish = Dishes({
        name: "Uthappizza",
        description: "test"
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec()
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.deleteOne({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err)=>{
            console.log(err);
        });
})
.catch((err)=>{
    console.log(err);
});