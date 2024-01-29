
# Melody Mix

Melody Mix is a music streaming platform built with Next.js, TypeScript, Mantine, and Prisma. It brings a fresh approach to music discovery and playlist creation, offering a unique feature to make playlists or songs either public or private.

## Features

- **Create Playlists**: Build your own playlists with your favorite songs.
- **Public and Private Playlists**: Choose whether to share your musical taste with the world or keep it private for personal enjoyment.
- **Seamless Navigation**: Built with Next.js for fast and smooth navigation between pages.
- **TypeScript Integration**: Ensures a more robust and maintainable codebase.
- **Mantine Components**: Utilizes Mantine for stylish and customizable UI components.
- **Prisma Database Integration**: Manages and stores data efficiently with Prisma.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/melody-mix.git
   ```

2. Install dependencies:

   ```bash
   cd melody-mix
   npm install
   ```

3. Set up the database with Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Configuration

- The project uses environment variables for configuration. Create a `.env` file in the root of the project and set the required variables.

  ```env
  DATABASE_URL="your-database-url"
  SECRET_KEY="your-secret-key"
  ```

## Contributing

Contributions are welcome! If you have any ideas, bug reports, or feature requests, please open an issue or submit a pull request.
