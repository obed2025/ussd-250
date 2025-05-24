import type { APIRoute } from 'astro';
import { getCodes } from '../../../appwrite';

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify({ count: (await getCodes()).total }));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
