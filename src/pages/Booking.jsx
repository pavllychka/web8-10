import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import BookingService from '../services/BookingService';
import movies from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = ObservablesState({ name: '', phone: '', email: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  const validateForm = () => {
    const newErrors = { name: '', phone: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон є обов'язковим";
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Емейл є обов'язковим";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введіть правильний емейл";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBooking = (seats) => {
    setSelectedSeats(seats);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    BookingService.saveBooking(id, {
      seats: selectedSeats,
      user: formData,
      timestamp: new Date().toISOString(),
    });
    toast.success('Бронювання успішно збережено!');
    setShowForm(false);
    setFormData({ name: '', phone: '', email: '' });
    setSelectedSeats([]);
  };

  return (
    <div>
      <h2>Бронювання: {movie.title}</h2>
      <p><strong>Сеанс:</strong> {movie.showtime}</p>
      <CinemaHall movieId={id} onBooking={handleBooking} />
      {showForm && (
        <div className="booking-form">
          <h3>Заповніть дані для бронювання</h3>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Ім'я"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Емейл"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button onClick={handleSubmit}>Підтвердити бронювання</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Booking;