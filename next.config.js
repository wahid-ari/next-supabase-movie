module.exports = {
  // https://vercel.com/guides/how-to-enable-cors#enabling-cors-in-a-next.js-app
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env: {
    API_ROUTE: 'http://localhost:3000',
    // API_ROUTE: "https://my-movie.vercel.app",
    SUPABASE_URL: 'https://dmkikqhgaiwprdgcvftb.supabase.co',
    SUPABASE_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRta2lrcWhnYWl3cHJkZ2N2ZnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcxMDIyMTAsImV4cCI6MTk3MjY3ODIxMH0.rZaJ7xkceVGl8Z--FLEP2VuLBAC9qze6QHQIdP14sBM',
    JWT_SECRET: 'hIeC2nLWT1VurroJ',
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.themoviedb.org', 'upload.wikimedia.org'],
  },
};
