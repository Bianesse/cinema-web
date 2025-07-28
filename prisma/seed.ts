// prisma/seed.ts
import { PrismaClient, SeatType, HallType, Role, MovieStatus, MovieRating, BookingStatus, PaymentStatus, Decimal } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data (optional - be careful in production!)
  await prisma.bookingSeat.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.showtime.deleteMany();
  await prisma.seat.deleteMany();
  await prisma.hall.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.cinema.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@cinema.com',
      phone: '+62812345678',
      passwordHash: hashedPassword,
      role: Role.ADMIN
    }
  });

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+62812345679',  
        passwordHash: hashedPassword,
        role: Role.USER
      }
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+62812345680',
        passwordHash: hashedPassword,
        role: Role.USER
      }
    }),
    prisma.user.create({
      data: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+62812345681',
        passwordHash: hashedPassword,
        role: Role.USER
      }
    })
  ]);

  // 2. Create Cinemas
  console.log('🏢 Creating cinemas...');
  const cinemas = await Promise.all([
    prisma.cinema.create({
      data: {
        name: 'Cinema XXI Plaza Senayan',
        location: 'Jakarta Selatan',
        address: 'Jl. Asia Afrika No. 8, Gelora, Tanah Abang, Jakarta Pusat',
        totalHalls: 6,
        facilities: ['Parking', 'Food Court', 'ATM', 'Cafe', 'Game Zone']
      }
    }),
    prisma.cinema.create({
      data: {
        name: 'Cinema XXI Grand Indonesia',
        location: 'Jakarta Pusat',
        address: 'Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat',
        totalHalls: 8,
        facilities: ['Valet Parking', 'Premium Lounge', 'Restaurant', 'Shopping Mall Access']
      }
    }),
    prisma.cinema.create({
      data: {
        name: 'Cinema XXI Bandung Supermall',
        location: 'Bandung',
        address: 'Jl. Gatot Subroto No. 289, Bandung',
        totalHalls: 5,
        facilities: ['Parking', 'Food Court', 'ATM', 'Kids Play Area']
      }
    })
  ]);

  // 3. Create Halls and Seats
  console.log('🎭 Creating halls and seats...');
  const halls = [];
  
  for (const cinema of cinemas) {
    for (let hallNum = 1; hallNum <= cinema.totalHalls; hallNum++) {
      const hallType: HallType = hallNum === 1 ? HallType.IMAX : 
                      hallNum === 2 ? HallType.FOUR_DX : 
                      hallNum === cinema.totalHalls ? HallType.DOLBY_ATMOS : HallType.REGULAR;
      
      const hall = await prisma.hall.create({
        data: {
          cinemaId: cinema.id,
          hallNumber: hallNum,
          hallName: `Hall ${hallNum}${hallType !== HallType.REGULAR ? ` - ${hallType}` : ''}`,
          totalSeats: hallType === HallType.IMAX ? 120 : hallType === HallType.FOUR_DX ? 80 : 96,
          hallType: hallType
        }
      });

      halls.push(hall);

      // Create seats for each hall
      const rows = hallType === HallType.FOUR_DX ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const seatsPerRow = hallType === HallType.IMAX ? 15 : hallType === HallType.FOUR_DX ? 16 : 12;

      for (const row of rows) {
        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
          let seatType: SeatType = SeatType.REGULAR;
          
          // VIP seats (back rows)
          if (['G', 'H'].includes(row)) {
            seatType = SeatType.VIP;
          }
          // Premium seats (middle rows)
          else if (['E', 'F'].includes(row)) {
            seatType = SeatType.PREMIUM;
          }

          await prisma.seat.create({
            data: {
              hallId: hall.id,
              seatRow: row,
              seatNumber: seatNum,
              seatType: seatType
            }
          });
        }
      }
    }
  }

  // 4. Create Movies
  console.log('🎬 Creating movies...');
  const movies = await Promise.all([
    prisma.movie.create({
      data: {
        title: 'Avatar: The Way of Water',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        duration: 192,
        rating: MovieRating.PG_13,
        synopsis: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their home.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0',
        director: 'James Cameron',
        cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
        releaseDate: new Date('2022-12-16'),
        status: MovieStatus.NOW_SHOWING
      }
    }),
    prisma.movie.create({
      data: {
        title: 'Top Gun: Maverick',
        genre: ['Action', 'Drama'],
        duration: 130,
        rating: MovieRating.PG_13,
        synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUNs elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=giXco2jaZ_4',
        director: 'Joseph Kosinski',
        cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
        releaseDate: new Date('2022-05-27'),
        status: MovieStatus.NOW_SHOWING
      }
    }),
    prisma.movie.create({
      data: {
        title: 'Spider-Man: Across the Spider-Verse',
        genre: ['Animation', 'Action', 'Adventure'],
        duration: 140,
        rating: MovieRating.PG,
        synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
        director: 'Joaquim Dos Santos',
        cast: ['Shameik Moore', 'Hailee Steinfeld', 'Brian Tyree Henry', 'Luna Lauren Velez'],
        releaseDate: new Date('2023-06-02'),
        status: MovieStatus.NOW_SHOWING
      }
    }),
    prisma.movie.create({
      data: {
        title: 'John Wick: Chapter 4',
        genre: ['Action', 'Crime', 'Thriller'],
        duration: 169,
        rating: MovieRating.R,
        synopsis: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
        director: 'Chad Stahelski',
        cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
        releaseDate: new Date('2023-03-24'),
        status: MovieStatus.NOW_SHOWING
      }
    }),
    prisma.movie.create({
      data: {
        title: 'Dune: Part Two',
        genre: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
        duration: 155,
        rating: MovieRating.PG_13,
        synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
        director: 'Denis Villeneuve',
        cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
        releaseDate: new Date('2024-03-01'),
        status: MovieStatus.COMING_SOON
      }
    }),
    prisma.movie.create({
      data: {
        title: 'The Batman',
        genre: ['Action', 'Crime', 'Drama'],
        duration: 176,
        rating: MovieRating.PG_13,  
        synopsis: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.',
        posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        trailerUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
        director: 'Matt Reeves',
        cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright'],
        releaseDate: new Date('2022-03-04'),
        status: MovieStatus.ENDED
      }
    })
  ]);

  // 5. Create Showtimes
  console.log('⏰ Creating showtimes...');
  const showtimes = [];
  const today = new Date();
  const timeSlots = ['10:00', '13:00', '16:00', '19:00', '22:00'];

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const showDate = new Date(today);
    showDate.setDate(today.getDate() + dayOffset);

    for (const movie of movies.filter(m => m.status === MovieStatus.NOW_SHOWING)) {
      for (const hall of halls.slice(0, 3)) { // Only use first 3 halls for each cinema
        for (const timeSlot of timeSlots.slice(0, 3)) { // 3 showtimes per day
          const [hour, minute] = timeSlot.split(':').map(Number);
          const showTime = new Date();
          showTime.setHours(hour, minute, 0, 0);

          // Price based on hall type and time
          let basePrice = 45000;
          if (hall.hallType === HallType.IMAX) basePrice = 75000;
          else if (hall.hallType === HallType.FOUR_DX) basePrice = 85000;
          else if (hall.hallType === HallType.DOLBY_ATMOS) basePrice = 60000;

          // Weekend surcharge
          if (showDate.getDay() === 0 || showDate.getDay() === 6) {
            basePrice += 10000;
          }

          // Evening surcharge
          if (hour >= 18) {
            basePrice += 5000;
          }

          const showtime = await prisma.showtime.create({
            data: {
              movieId: movie.id,
              hallId: hall.id,
              showDate: showDate,
              showTime: showTime,
              price: new Decimal(basePrice),
              availableSeats: hall.totalSeats
            }
          });

          showtimes.push(showtime);
        }
      }
    }
  }

  // 6. Create Sample Bookings
  console.log('🎫 Creating sample bookings...');
  const bookings = [];

  for (let i = 0; i < 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomShowtime = showtimes[Math.floor(Math.random() * showtimes.length)];
    
    // Generate booking code
    const bookingCode = `BK${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;

    // Get random seats for this hall
    const hallSeats = await prisma.seat.findMany({
      where: { hallId: randomShowtime.hallId },
      take: Math.floor(Math.random() * 4) + 1 // 1-4 seats
    });

    const totalAmount = hallSeats.reduce((sum, seat) => {
      let seatPrice = Number(randomShowtime.price);
      if (seat.seatType === SeatType.PREMIUM) seatPrice = seatPrice * 1.5;
      else if (seat.seatType === SeatType.VIP) seatPrice = seatPrice * 2;
      return sum + seatPrice;
    }, 0);

    const booking = await prisma.booking.create({
      data: {
        userId: randomUser.id,
        showtimeId: randomShowtime.id,
        bookingCode: bookingCode,
        totalAmount: new Decimal(totalAmount),
        bookingStatus: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.COMPLETED][Math.floor(Math.random() * 3)],
        paymentStatus: [PaymentStatus.PENDING, PaymentStatus.PAID][Math.floor(Math.random() * 2)],
        paymentMethod: ['Credit Card', 'Bank Transfer', 'E-Wallet'][Math.floor(Math.random() * 3)]
      }
    });

    // Create booking seats
    for (const seat of hallSeats) {
      await prisma.bookingSeat.create({
        data: {
          bookingId: booking.id,
          seatId: seat.id
        }
      });
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        paymentMethod: booking.paymentMethod || 'Credit Card',
        amount: new Decimal(totalAmount),
        transactionId: `TXN${Date.now().toString().slice(-10)}`,
        status: booking.paymentStatus,
        paymentDate: booking.paymentStatus === PaymentStatus.PAID ? new Date() : null
      }
    });

    // Update available seats
    await prisma.showtime.update({
      where: { id: randomShowtime.id },
      data: {
        availableSeats: {
          decrement: hallSeats.length
        }
      }
    });

    bookings.push(booking);
  }

  console.log('✅ Database seeding completed!');
  console.log(`📊 Created:
    - ${[admin, ...users].length} users (1 admin, ${users.length} regular users)
    - ${cinemas.length} cinemas
    - ${halls.length} halls
    - ${halls.reduce((sum, hall) => sum + hall.totalSeats, 0)} seats total
    - ${movies.length} movies
    - ${showtimes.length} showtimes
    - ${bookings.length} sample bookings
  `);

  console.log(`🔑 Login credentials:
    Admin: admin@cinema.com / password123
    User: john@example.com / password123
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });