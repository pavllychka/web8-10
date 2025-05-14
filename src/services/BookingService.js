const BookingService = {
    saveBooking(movieId, bookingData) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
      if (!bookings[movieId]) {
        bookings[movieId] = [];
      }
      bookings[movieId].push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(bookings));
    },
  
    getBookedSeats(movieId) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
      return bookings[movieId] ? bookings[movieId].flatMap((booking) => booking.seats) : [];
    }
  };
  
  export default BookingService;