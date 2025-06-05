// app/api/imdb/top-rated-english-movies/route.ts
export async function GET() {
  try {
    const res = await fetch('https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    });

    if (!res.ok) {
      return new Response('Failed to fetch from RapidAPI', { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
