import React, { useState } from 'react';
import './App.css';
import Header from './header';
import Card from './card';
import Options from './options';

const App = () => {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const [image_type, setImageType] = useState('nebula');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(-1);

  const fetchImages = () => {
    const url = `https://images-api.nasa.gov/search?q=${image_type}&media_type=image&page=${page}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Problems getting the data.');
      })
      .then(({ collection }) => {
        const {
          metadata: { total_hits: count },
          items
        } = collection;

        const images = items.map(item => {
          const { center, date_created, description, title } = item.data[0];
          const { href } = item.links[0];
          return { center, date_created, description, title, href };
        });
        setCount(count);
        setImages(images);
        if (count > 0) {
          setCurrentImage(0);
        }
      })
      .catch(error => setError(error.message));
  };

  const imageCard =
    currentImage > -1 ? <Card image={images[currentImage]} /> : '';

  const controls =
    currentImage > -1 ? (
      <div className="controls">
        <button
          disabled={currentImage < 1}
          onClick={e => setCurrentImage(currentImage - 1)}
        >
          &lt;
        </button>
        <div className="control_count">
          Image {currentImage + 1} of {count}
        </div>
        {currentImage < count ? (
          <button onClick={e => setCurrentImage(currentImage + 1)}>&gt;</button>
        ) : (
          ''
        )}
      </div>
    ) : (
      ''
    );

  return (
    <div className="App">
      <Header />
      <Options
        onChange={imageType => setImageType(imageType)}
        onClick={fetchImages}
        error={error}
        image_type={image_type}
      />
      <div>{imageCard}</div>
      {controls}
    </div>
  );
};

export default App;
