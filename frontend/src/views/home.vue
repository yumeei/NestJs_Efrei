<template>
  <div>
    <h1 class="page-title">Liste des Films</h1>

    <input
      v-model="searchQuery"
      placeholder="Rechercher des films..."
      class="search-input"
    />
    <div v-if="movies.length" class="movies-container">
      <div class="movies-grid">
        <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
          <img
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
            class="movie-poster"
          />
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-overview">{{ movie.overview }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Aucun film trouvé</p>
    </div>

    <div class="pagination">
      <button @click="changePage(1)">1</button>
      <button @click="changePage(2)">2</button>
      <button @click="changePage(3)">3</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movies: [],
      searchQuery: "",
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get("http://localhost:3000/movies", {
          params: {
            query: this.searchQuery,
            page: this.currentPage,
            perPage: this.perPage,
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchMovies();
    },
    getPosterUrl(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      }
      return "https://via.placeholder.com/500x750?text=No+Image";
    },
    
  },
  computed: {
    filteredMovies() {
      if (!this.searchQuery.trim()) {
        return this.movies;
      }
      return this.movies.filter(movie => 
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
      );
    }
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  display: block;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.movies-container {
  padding: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-10px);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 2px solid #eee;
}

.movie-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.movie-overview {
  padding: 0 10px;
  font-size: 0.9rem;
  color: #555;
  height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 15px;
}

.pagination {
  text-align: center;
  margin-top: 30px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
