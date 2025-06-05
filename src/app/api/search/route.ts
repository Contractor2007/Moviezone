import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query')?.trim() || '';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "query" is required.' },
        { status: 400 }
      );
    }

    const options = {
      method: 'GET',
      hostname: 'imdb232.p.rapidapi.com',
      path: `/api/search?count=25&type=MOVIE&q=${encodeURIComponent(query)}`,
      headers: {
        'x-rapidapi-key': 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
        'x-rapidapi-host': 'imdb232.p.rapidapi.com',
      },
    };

    // Wrap the https request in a Promise to await it
    const data = await new Promise<any>((resolve, reject) => {
      const request = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString();
            const json = JSON.parse(body);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        });
      });

      request.on('error', (err) => {
        reject(err);
      });

      request.end();
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
