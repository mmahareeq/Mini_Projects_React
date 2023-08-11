import React, { useEffect, useState } from "react";

//import "./styles.css";

export default function App() {
  const [images, setImages] = useState([]);

  const [query, setQuery] = useState("");

  const [page, setPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = () => {
    setIsLoading(true);

    const url = `https://pixabay.com/api/?key=38742818-d50c4417c6262773d701f5c57&q=${query}&page=${page}image_type=photo&pretty=true`;

    try {
      fetch(url)
        .then((response) => response.json())

        .then((data) => {
          console.log(data.hits);

          setImages((preImg) => [...preImg, ...data.hits]);
        });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      setPages(1);

      setImages([]);

      fetchImages();
    }
  }, [query]);

  // when search is clicked*

  const handleSubmit = (event) => {
    event.preventDefault();

    setQuery(event.target.elements.searchInput.value);
  };

  const handleScroll = () => {
    // client height:These properties provide the size of the area inside the element borders.*

    //  scrollheight: they also include the scrolled out (hidden) parts:*

    // are the width/height of the hidden, scrolled out part of the element.*

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setPages((prevPage) => prevPage + 1);

      fetchImages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // should do that*

    // unmounting*

    console.log("hi");

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="App">
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchInput"
            placeholder="Enter your search query..."
          />

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="image-grid">
        {images.map((image) => (
          <img key={image.id} src={image.previewURL} alt={image.tags} />
        ))}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}
