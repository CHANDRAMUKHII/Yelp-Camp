const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62fe4487c7c3e4d48f8163ec",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, vel iste. Nam obcaecati at, nobis velit molestiae error ex rerum quis magni id ut provident cum atque doloremque expedita! Deserunt?",
      price: price,
      images: [
        {
          url:
            "https://res.cloudinary.com/da13rkf7v/image/upload/v1660971827/YelpCamp/wctrli8pblnmkxopddx4.jpg",
          filename: "YelpCamp/wctrli8pblnmkxopddx4",
        },
        {
          url:
            "https://res.cloudinary.com/da13rkf7v/image/upload/v1660971827/YelpCamp/tayzz60moucl5gbgyjl8.jpg",
          filename: "YelpCamp/tayzz60moucl5gbgyjl8",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
