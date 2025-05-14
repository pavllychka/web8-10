import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import movies from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  const handleBooking = (seats) => {
    setSelectedSeats(seats);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Бронювання: {movie.title}</h2>
      <p><strong>Сеанс:</strong> {movie.showtime}</p>
      <CinemaHall movieId={id} onBooking={handleBooking} />
      {showForm && (
        <div className="booking-form">
          <h3>Заповніть дані для бронювання</h3>
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Емейл"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default Booking;