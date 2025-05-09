import { NextResponse } from 'next/server';
import https from 'https';

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    const options = {
      method: 'GET',
      hostname: 'imdb236.p.rapidapi.com',
      port: null,
      path: '/imdb/lowest-rated-movies',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      }
    };

    const apiRequest = https.request(options, (apiResponse) => {
      let data = '';

      apiResponse.on('data', (chunk) => {
        data += chunk;
      });

      apiResponse.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(NextResponse.json(result));
        } catch (error) {
          resolve(NextResponse.json(
            { message: 'Error parsing API response', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
          ));
        }
      });
    });

    apiRequest.on('error', (error) => {
      resolve(NextResponse.json(
        { message: 'Error fetching from IMDb API', error: error.message },
        { status: 500 }
      ));
    });

    apiRequest.end();
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}