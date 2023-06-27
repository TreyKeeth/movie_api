const express = require("express"),
bodyParser = require("body-parser"),
uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

// let favoriteMovies = [
//   {
//     title: 'Anchorman'
//   },
//   {
//     title: 'Django Unchained'
//   },
//   {
//     title: 'Inglorious Bastards'
//   },
//   {
//     title: 'Wolf of Wall Street'
//   },
//   {
//     title: 'American Gangster'
//   }
// ];

let users = [
  {
    id: 1,
    name: "Lance",
    userFavorites: ["Lizard Boy"]
  }
];

let movies = [
  {
    movieName: "Stepbrothers", 
    genre: {
    name: "Comedy", 
    description: "Movies that make people laugh"
    },
    director: {
    name: "Adam McKay",
    yearBorn: "1968"  
    }
  }
]

//Adds a new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing username input";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update the "username" of a user by users/id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUsername = req.body;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUsername.name;
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found.");
  }
}); 

// Remove a user by ID
app.delete("/users/:id", (req, res) => {
  let user = users.find((user) => {
    return user.id === req.params.id;
  });

  if (user) {
    users = users.filter((obj) => {
      return obj.id !== req.params.id;
    });
    res.status(201).send("User " + req.params.id + " was removed.");
  }
});

// Add a movie to user favorites
app.post('/users/:id/:movieName', (req, res) => {
    const { id, movieName } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.userFavorites.push(movieName);
        res.status(200).send(`${movieName} has been added to user's favorites`);
    } else {
        res.status(404).send("User not found.");
    }
}); 

// Remove a movie from user favorites
app.delete('/users/:id/:movieName', (req, res) => {
    const { id, movieName } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.userFavorites = user.userFavorites.filter(movieName => movieName!==movieName)
        res.status(200).send(`${movieName} has been removed from user's favorites list`);
    } else {
        res.status(404).send("User not found.");
    }
}); 

// Gets the list of all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// Gets the data about a single movie, by name
app.get('/movies/:movieName', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.name === req.params.name }));
});

// Gets the data about a movie genre, by name
app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("Genre not found.");
  }
});


// Gets the data about a movie director, by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director); 
    } else {
        res.status(404).send("Director not found.");
    }
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
