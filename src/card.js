import React from 'react';
import moment from 'moment';

const Card = ({ image }) => {
  return (
    <div className="card">
      <img src={image.href} alt={image.title} />
      <div className="card_content">
        <h3>{image.title}</h3>

        <div className="card_description">{image.description}</div>

        <div className="card_date">
          {moment(image.date_created).format('DD MMMM YYYY')}
        </div>
      </div>
    </div>
  );
};

export default Card;
