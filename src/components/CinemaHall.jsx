import React from 'react';

const CinemaHall = () => {
  const seats = Array(5).fill().map((_, row) =>
    Array(10).fill().map((_, col) => ({
      id: `${row + 1}-${col + 1}`,
      row: row + 1,
      col: col + 1,
      booked: Math.random() > 0.7, // 30% місць заброньовано
    }))
  );

  return (
    <div className="cinema-hall">
      <h2>Кінозал</h2>
      <div className="seats-grid">
        {seats.map((row) =>
          row.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.booked ? 'booked' : 'available'}`}
            >
              {seat.row}-{seat.col}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CinemaHall;