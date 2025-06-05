import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://news-api14.p.rapidapi.com/v2/search/publishers';
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
      'x-rapidapi-host': 'news-api14.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}