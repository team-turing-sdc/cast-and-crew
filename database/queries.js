const Pool = require("pg").Pool;

const pool = new Pool({
  user: "rebeccasawyer",
  host: "localhost",
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

const createActor = (name, title, role, photo, bio, filmography, callback) => {
  pool.query(
    "INSERT INTO actors (name, title, role, photo, bio, filmography) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, title, movieId, role, photo, bio, filmography],
    (err, results) => {
      if (err) {
        throw err;
      }
      callback(null, results);
    }
  );
};

const updateActor = (name, title, id, callback) => {
  pool.query(
    "UPDATE actors SET name = $1, title = $2 WHERE id = $3",
    [name, title, id],
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
