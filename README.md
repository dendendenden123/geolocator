# Geolocator Application

A Laravel + React + Vite application for geolocation mapping with interactive features.

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **PHP** 8.1+
- **Composer** (PHP package manager)
- **Node.js** 16+ (comes with npm)
- **npm** 8+
- **XAMPP** or any local PHP server setup (optional for local testing)

## Local Setup Instructions

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/dendendenden123/geolocator.git
cd geolocator
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install JavaScript Dependencies

Install React, Vite plugin, and mapping libraries:

```bash
npm install
npm install --save-dev react react-dom
npm install --save-dev @vitejs/plugin-react
npm install react-leaflet@4 leaflet --legacy-peer-deps
```

### 4. Install Laravel Breeze Authentication

```bash
composer require laravel/breeze --dev
```

### 5. Environment Configuration

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Update your `.env` file with your database credentials and any other required configuration.

### 6. Database Setup

Create the database and run migrations:

```bash
php artisan migrate
```

(Optional) Seed the database with sample data:

```bash
php artisan db:seed
```

### 7. Build Front-end Assets

```bash
npm run dev
```

Or for production build:

```bash
npm run build
```

## Running the Application

### Development Server

Start the Laravel development server:

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

### Watch Mode for Front-end

In another terminal, keep front-end assets updated during development:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
php artisan test
```

Or use PHPUnit directly:

```bash
./vendor/bin/phpunit
```

## Project Structure

- **`app/`** - Laravel application code (Controllers, Models, Middleware)
- **`resources/js/`** - React components and JavaScript code
- **`resources/views/`** - Blade templates
- **`routes/`** - Application routes
- **`database/`** - Migrations and seeders
- **`public/`** - Public assets and index.php

## Technologies Used

- **Laravel** - Backend framework
- **React** - Frontend UI library
- **Vite** - Build tool and dev server
- **React Leaflet** - Interactive maps
- **Tailwind CSS** - Utility-first CSS framework

