const mongoose = require("mongoose");
const url = `mongodb+srv://admin:molecule%40123@cluster0.5wedl.mongodb.net/moleculeDB?retryWrites=true&w=majority`
;
module.exports.connect =  () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};

// export default db