const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "ec2-18-191-228-224.us-east-2.compute.amazonaws.com",
  database: "fandagit",
  password: "",
  port: 5432
});

const getActorById = (id1, id2, callback) => {
  pool.query(
    "SELECT * FROM actors WHERE id>= $1 and id<= $2;",
    [id1, id2],
    (err, results) => {
      if (err) {
        throw err;
      }
      callback(null, results);
    }
  );
};

const createActor = (name, role, photo, bio, filmography, callback) => {
  pool.query(
    "INSERT INTO actors (name, role, photo, bio, filmography) VALUES ($1, $2, $3, $4, $5)",
    [name, role, photo, bio, filmography],
    (err, results) => {
      if (err) {
        throw err;
      }
      callback(null, results);
    }
  );
};

const updateActor = (name, id, callback) => {
  pool.query(
    "UPDATE actors SET name = $1 WHERE id = $3",
    [name, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      callback(null, `Actor modified with ID: ${id}`);
    }
  );
};

const deleteActor = (id, callback) => {
  pool.query("DELETE FROM actors WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    callback(null, `Actor deleted with ID: ${id}`);
  });
};

module.exports = {
  pool,
  getActorById,
  createActor,
  updateActor,
  deleteActor
};
