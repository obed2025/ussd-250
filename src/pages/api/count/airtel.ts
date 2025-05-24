import type { APIRoute } from 'astro';
import { getAirtelCodes } from '../../../appwrite';
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return new Response(
      JSON.stringify({ count: (await getAirtelCodes()).total })
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
