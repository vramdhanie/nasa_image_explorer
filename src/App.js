import React, { useState } from 'react';
import './App.css';
import moment from 'moment';

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
        console.log(collection);
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
    currentImage > -1 ? (
      <div className="card">
        <img src={images[currentImage].href} alt={images[currentImage].title} />
        <div className="card_content">
          <h3>{images[currentImage].title}</h3>

          <div className="card_description">
            {images[currentImage].description}
          </div>

          <div className="card_date">
            {moment(images[currentImage].date_created).format('DD MMMM YYYY')}
          </div>
        </div>
      </div>
    ) : (
      ''
    );

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

  const artifacts = ['planet', 'nebula', 'galaxy', 'pulsar'];
  const options = artifacts.map((a, i) => (
    <option value={a} key={i}>
      {a}
    </option>
  ));

  return (
    <div className="App">
      <header>
        <h1>NASA Image Explorer</h1>
      </header>
      <div className="options">
        <h3>Select An option:</h3>
        <div className="options_form">
          <select
            value={image_type}
            onChange={e => setImageType(e.target.value)}
          >
            {options}
          </select>
          <button onClick={fetchImages}> Search </button>
          {error ? <div className="error">{error}</div> : ''}
        </div>
      </div>
      <div>{imageCard}</div>
      {controls}
    </div>
  );
};

export default App;
