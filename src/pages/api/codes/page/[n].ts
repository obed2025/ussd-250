import type { APIRoute } from 'astro';
import { getCodes } from '../../../../appwrite';
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    return new Response(JSON.stringify(await getCodes(+(params.n ?? '0'))));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
