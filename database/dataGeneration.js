const faker = require("faker");
const fs = require("fs");
const csvWriter = require("csv-write-stream");
var writer = csvWriter();

const generateFilmography = () => {
  let movies = [];
  for (let i = 1; i < Math.floor(Math.random() * 6) + 1; i++) {
    movies.push(faker.random.word());
  }
  return movies;
};

const generateActors = () => {
  writer.pipe(fs.createWriteStream("actors.csv"));
  for (let i = 0; i < 10000000; i++) {
    writer.write({
      id: i + 1,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      role: faker.name.jobTitle(),
      photo: `https://robohash.org/${faker.lorem.word()}.jpg?size=164x250`,
      bio: faker.lorem.paragraph(),
      filmography: JSON.stringify(generateFilmography())
    });
  }
  writer.end();
  console.log("done");
};

//generateActors();
