const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(movies, actors, directors, studios, categories, countries) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
      <!-- Manually set the URLs we know already-->
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${BASE_URL}/movies</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/actors</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/directors</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/studios</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/categories</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/countries</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/browse</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/login</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>

  <!-- Automatically generate dynamic movies page-->
  ${movies
    .map((movie) => {
      return `
      <url>
        <loc>${`${BASE_URL}/movies/${movie.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic actors page-->
  ${actors
    .map((actor) => {
      return `
      <url>
        <loc>${`${BASE_URL}/actors/${actor.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic directors page-->
  ${directors
    .map((director) => {
      return `
      <url>
        <loc>${`${BASE_URL}/directors/${director.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic studios page-->
  ${studios
    .map((studio) => {
      return `
      <url>
        <loc>${`${BASE_URL}/studios/${studio.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic categories page-->
  ${categories
    .map((category) => {
      return `
      <url>
        <loc>${`${BASE_URL}/categories/${category.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic countries page-->
  ${countries
    .map((country) => {
      return `
      <url>
        <loc>${`${BASE_URL}/countries/${country.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}

    </urlset>
  `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const getAllMovies = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/movies`);
  const movies = await getAllMovies.json();
  const getAllActors = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/actors`);
  const actors = await getAllActors.json();
  const getAllDirectors = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/directors`);
  const directors = await getAllDirectors.json();
  const getAllStudios = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/studios`);
  const studios = await getAllStudios.json();
  const getAllCategories = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/category`);
  const categories = await getAllCategories.json();
  const getAllCountries = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/country`);
  const countries = await getAllCountries.json();

  // We generate the XML sitemap with the data
  const sitemap = generateSiteMap(movies, actors, directors, studios, categories, countries);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
