import type { APIRoute } from 'astro';
import { createCode, getCodes } from '../../appwrite';
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify(await getCodes()));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ error: 'No data provided!' }), {
      status: 400,
    });
  }

  try {
    const body = await request.json();
    const ussdRegex = /^\*[\d]+(\*[\d]+)*#$/;

    if (ussdRegex.test(body.code) || Number(body.code)) {
      return new Response(JSON.stringify(await createCode(body)));
    } else {
      throw new Error('Invalid USSD code');
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
};
