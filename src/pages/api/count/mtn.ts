import type { APIRoute } from 'astro';
import { getMTNCodes } from '../../../appwrite';
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify({ count: (await getMTNCodes()).total }));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
