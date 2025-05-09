import { NextResponse } from 'next/server';

export async function GET() {
  const options = {
    method: 'GET',
    hostname: 'imdb236.p.rapidapi.com',
    path: '/imdb/most-popular-movies',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
  };

  try {
    const response = await new Promise((resolve, reject) => {
      const https = require('https');
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
}