import React, { useState } from 'react';
import BookingService from '../services/BookingService';

const CinemaHall = ({ movieId, onBooking }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = BookingService.getBookedSeats(movieId);
  const seats = Array(5).fill().map((_, row) =>
    Array(10).fill().map((_, col) => ({
      id: `${row + 1}-${col + 1}`,
      row: row + 1,
      col: col + 1,
      booked: bookedSeats.includes(`${row + 1}-${col + 1}`),
    }))
  );

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Виберіть хоча б одне місце!');
      return;
    }
    onBooking(selectedSeats);
    setSelectedSeats([]);
  };

  return (
    <div className="cinema-hall">
      <h2>Кінозал</h2>
      <div className="seats-grid">
        {seats.map((row) =>
          row.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.booked ? 'booked' : selectedSeats.includes(seat.id) ? 'selected' : 'available'}`}
              onClick={() => toggleSeat(seat)}
            >
              {seat.row}-{seat.col}
            </div>
          ))
        )}
      </div>
      <div className="selected-seats">
        <h3>Вибрані місця:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає вибраних місць'}</p>
      </div>
      <button className="booking-button" onClick={handleBooking}>
        Забронювати
      </button>
    </div>
  );
};

export default CinemaHall;