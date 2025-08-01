# Cinemax - Aplikasi Pemesanan Tiket Bioskop Online

Cinemax adalah platform web untuk melihat informasi film dan memesan tiket bioskop secara online. Aplikasi ini dirancang untuk memberikan pengalaman yang mudah dan efisien bagi pengguna, sekaligus menyediakan sistem manajemen yang lengkap untuk admin.

---

## Fitur Utama

### Tampilan Pengguna (Landing Page)

Pengguna dapat menjelajahi berbagai informasi tanpa harus login, termasuk:
* Melihat daftar film yang sedang tayang (**Now Playing**).
* Mencari dan melihat detail lengkap semua film (sinopsis, rating, jadwal, dll.).
* Melihat daftar lokasi bioskop yang tersedia.

### Autentikasi Pengguna

* **Login & Register**: Pengguna dapat membuat akun atau masuk untuk mendapatkan akses ke fitur personal, seperti riwayat pemesanan.
* **Navigasi**: Tombol Login dan Register tersedia di **navbar** untuk memudahkan akses.

---

## Akses dan Fitur Admin

Sistem ini memiliki area khusus untuk admin guna mengelola seluruh data aplikasi.

### Alur Masuk Admin

* **Redirect Otomatis**: Setelah admin berhasil login, sistem akan secara otomatis mengarahkan ke **Dashboard Admin**.
* **Akses Manual**: Admin juga bisa masuk ke dashboard melalui **ikon profil** yang muncul di navbar setelah login. Cukup klik ikon tersebut dan pilih **Admin Dashboard**.

### Dashboard Admin

Dashboard ini berfungsi sebagai pusat kontrol dengan fitur sebagai berikut:

* **Statistik**: Melihat data penting seperti jumlah film, pengguna, dan transaksi.
* **Manajemen Data (CRUD)**: Admin dapat melakukan **`Create`**, **`Read`**, **`Update`**, dan **`Delete`** untuk data:
    * **Movies**: Mengelola daftar film yang tersedia.
    * **Locations**: Mengelola informasi lokasi bioskop.
    * **Users**: Mengelola daftar pengguna terdaftar.

---

## Cara Menjalankan Proyek

*(Bagian ini bisa Anda sesuaikan dengan teknologi dan instruksi spesifik dari proyek Anda.)*

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/Bianesse/cinema-web
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd cinema-web
    ```
3.  **Instal dependensi:**
    ```bash
    pnpm install
    # or
    npm install
    ```
4.  **Setup DB:**
    ```bash
    Setup dan buat database dari neon dan masukkan key dan balue pada .env | .env.local
    ```
4.  **Generate Prisma:**
    ```bash
    pnpx prisma generate
    # or
    npx prisma generate
    ```
5.  **Migrate Prisma:**
    ```bash
    pnpx prisma migrate dev
    # or
    pnpx prisma migrate dev
    ```  
5.  **Seed Prisma:**
    ```bash
    tambah "db:seed": "tsx prisma/seed.ts" dalam scripts di file package.json
    # then
    pnpm db:seed
    ```    
5.  **Generate Secret:**
    ```bash
    pnpx auth secret
    # or
    npx auth secret
    ```
6.  **Jalankan aplikasi:**
    ```bash
    pnpm dev
    # or
    npm dev
    ```

    Buka [http://localhost:3000](http://localhost:3000) di browser
---


## Tim Pengembang

* [Kasabian Ibrahim] - [Developer]
