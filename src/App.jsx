import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  let accessKey = "sw7i4ECWbk56CVTl3sRZlFa8o3ICGM4L8OLjHnVU05E";

  let handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      let res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`
      );

      let data = await res.json();
      setImages(data.results);
    } catch (error) {
      console.error("Something is wrong:", error);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="gallery">
        {images.map((img) => (
          <img key={img.id} src={img.urls.small} alt={img.alt_description} />
        ))}
      </div>
    </div>
  );
}

export default App;
