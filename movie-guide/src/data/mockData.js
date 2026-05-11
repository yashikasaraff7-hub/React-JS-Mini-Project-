
export const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Thriller",
];

export const actors = [
  {
    id: "a1",
    name: "Leonardo DiCaprio",
    photo: "https://ui-avatars.com/api/?name=Leonardo+DiCaprio&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "November 11, 1974",
    birthplace: "Los Angeles, California, USA",
    bio: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards.",
    movies: ["m1", "m3", "m7"],
    role: "Actor",
  },
  {
    id: "a2",
    name: "Scarlett Johansson",
    photo: "https://ui-avatars.com/api/?name=Scarlett+Johansson&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "November 22, 1984",
    birthplace: "New York City, New York, USA",
    bio: "Scarlett Ingrid Johansson is an American actress. She was the world's highest-paid actress in 2018 and 2019, and has featured multiple times on the Forbes Celebrity 100 list. She has received various accolades, including a Tony Award and nominations for two Academy Awards.",
    movies: ["m2", "m6"],
    role: "Actor",
  },
  {
    id: "a3",
    name: "Christopher Nolan",
    photo: "https://ui-avatars.com/api/?name=Christopher+Nolan&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "July 30, 1970",
    birthplace: "London, England, UK",
    bio: "Christopher Edward Nolan is a British-American filmmaker. He is one of the highest-grossing directors in history and considered one of the most influential of his generation. He is best known for directing The Dark Knight Trilogy, Inception, Interstellar, Dunkirk, Tenet, and Oppenheimer.",
    movies: ["m1", "m4", "m8"],
    role: "Director",
  },
  {
    id: "a4",
    name: "Tom Hanks",
    photo: "https://ui-avatars.com/api/?name=Tom+Hanks&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "July 9, 1956",
    birthplace: "Concord, California, USA",
    bio: "Thomas Jeffrey Hanks is an American actor and filmmaker. Known for his roles in Philadelphia, Forrest Gump, Cast Away, The Terminal, The Da Vinci Code, and Captain Phillips. Hanks is one of only two actors to have won the Academy Award for Best Actor in consecutive years.",
    movies: ["m5", "m9"],
    role: "Actor",
  },
  {
    id: "a5",
    name: "Meryl Streep",
    photo: "https://ui-avatars.com/api/?name=Meryl+Streep&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "June 22, 1949",
    birthplace: "Summit, New Jersey, USA",
    bio: "Mary Louise Streep, known professionally as Meryl Streep, is an American actress. Often described as 'the best actress of her generation', Streep is particularly known for her versatility and her method of transforming herself into the roles she plays.",
    movies: ["m10", "m9"],
    role: "Actor",
  },
  {
    id: "a6",
    name: "Cillian Murphy",
    photo: "https://ui-avatars.com/api/?name=Cillian+Murphy&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "May 25, 1976",
    birthplace: "Douglas, County Cork, Ireland",
    bio: "Cillian Murphy is an Irish actor. He has received various accolades, including an Academy Award, a Screen Actors Guild Award, a Critics' Choice Award, and a BAFTA Award. He is known for his roles in 28 Days Later, Batman Begins, Sunshine, and the Peaky Blinders TV series.",
    movies: ["m8", "m4"],
    role: "Actor",
  },
  {
    id: "a7",
    name: "Anya Taylor-Joy",
    photo: "https://ui-avatars.com/api/?name=Anya+Taylor-Joy&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "April 16, 1996",
    birthplace: "Miami, Florida, USA",
    bio: "Anya-Josephine Marie Taylor-Joy is an American-British actress. She is known for her roles in The Witch, Split, Emma, Last Night in Soho, The Queen's Gambit, and Furiosa.",
    movies: ["m6", "m10"],
    role: "Actor",
  },
  {
    id: "a8",
    name: "Denis Villeneuve",
    photo: "https://ui-avatars.com/api/?name=Denis+Villeneuve&size=300&background=1a1a2e&color=e94560&bold=true&font-size=0.3",
    born: "October 3, 1967",
    birthplace: "Gentilly, Quebec, Canada",
    bio: "Denis Villeneuve is a Canadian film director and writer. He is known for directing Incendies, Prisoners, Enemy, Sicario, Arrival, Blade Runner 2049, and the Dune adaptations.",
    movies: ["m2", "m7"],
    role: "Director",
  },
];

export const movies = [
  {
    id: "m1",
    title: "Inception",
    year: 2010,
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    duration: "2h 28m",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    director: "a3",
    cast: ["a1", "a6"],
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    trending: true,
    reviews: [],
  },
  {
    id: "m2",
    title: "Dune: Part Two",
    year: 2024,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.5,
    duration: "2h 46m",
    synopsis:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    director: "a8",
    cast: ["a2", "a7"],
    poster:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    trending: true,
    reviews: [],
  },
  {
    id: "m3",
    title: "The Revenant",
    year: 2015,
    genre: ["Drama", "Action", "Adventure"],
    rating: 8.0,
    duration: "2h 36m",
    synopsis:
      "A frontiersman on a fur trading expedition in the 1820s fights for survival after being left for dead by members of his own hunting team.",
    director: "a3",
    cast: ["a1"],
    poster:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1542332213-31f87348057f?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/QRfj1VCg16E",
    trending: false,
    reviews: [],
  },
  {
    id: "m4",
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    duration: "2h 49m",
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth becomes uninhabitable, they must find a new home among the stars.",
    director: "a3",
    cast: ["a6"],
    poster:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    trending: true,
    reviews: [],
  },
  {
    id: "m5",
    title: "Cast Away",
    year: 2000,
    genre: ["Drama", "Adventure"],
    rating: 7.8,
    duration: "2h 23m",
    synopsis:
      "A FedEx executive must transform himself physically and emotionally to survive a crash landing on a deserted island. Isolated for four years, he discovers the will to live.",
    director: "a3",
    cast: ["a4"],
    poster:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/ixljWVyPby0",
    trending: false,
    reviews: [],
  },
  {
    id: "m6",
    title: "Black Widow",
    year: 2021,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 6.7,
    duration: "2h 14m",
    synopsis:
      "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down.",
    director: "a8",
    cast: ["a2", "a7"],
    poster:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/Fp9pNPdNwjI",
    trending: false,
    reviews: [],
  },
  {
    id: "m7",
    title: "Shutter Island",
    year: 2010,
    genre: ["Mystery", "Thriller", "Drama"],
    rating: 8.1,
    duration: "2h 18m",
    synopsis:
      "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane, only to find himself questioning his own sanity.",
    director: "a8",
    cast: ["a1"],
    poster:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/5iaYLCiq5RM",
    trending: true,
    reviews: [],
  },
  {
    id: "m8",
    title: "Oppenheimer",
    year: 2023,
    genre: ["Drama", "Thriller", "Mystery"],
    rating: 8.9,
    duration: "3h 0m",
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A story of genius, ambition, and moral reckoning.",
    director: "a3",
    cast: ["a6"],
    poster:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
    trending: true,
    reviews: [],
  },
  {
    id: "m9",
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Comedy", "Romance"],
    rating: 8.8,
    duration: "2h 22m",
    synopsis:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    director: "a3",
    cast: ["a4", "a5"],
    poster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/bLvqoHBptjg",
    trending: false,
    reviews: [],
  },
  {
    id: "m10",
    title: "The Queen's Gambit",
    year: 2020,
    genre: ["Drama", "Mystery"],
    rating: 8.6,
    duration: "1h 55m",
    synopsis:
      "An orphaned child prodigy rises to become the world's greatest chess player while also battling drug and alcohol dependency. A story of resilience and obsession.",
    director: "a8",
    cast: ["a5", "a7"],
    poster:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=600&fit=crop&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?w=1280&h=720&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/oZtj4nxHVoM",
    trending: true,
    reviews: [],
  },
];

export const getMovieById = (id) => movies.find((m) => m.id === id);
export const getActorById = (id) => actors.find((a) => a.id === id);

export const getSimilarMovies = (movieId) => {
  const movie = getMovieById(movieId);
  if (!movie) return [];
  return movies
    .filter(
      (m) => m.id !== movieId && m.genre.some((g) => movie.genre.includes(g))
    )
    .slice(0, 4);
};

export const getMoviesByActorId = (actorId) => {
  const actor = getActorById(actorId);
  if (!actor) return [];
  return actor.movies.map((id) => getMovieById(id)).filter(Boolean);
};

export const years = [...new Set(movies.map((m) => m.year))].sort(
  (a, b) => b - a
);
