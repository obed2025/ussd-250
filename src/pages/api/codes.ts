import { Client, Databases, ID, type Models } from 'node-appwrite';
import type { APIRoute } from 'astro';

const {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
} = import.meta.env;

if (
  !APPWRITE_API_ENDPOINT ||
  !APPWRITE_COLLECTION_ID ||
  !APPWRITE_DATABASE_ID ||
  !APPWRITE_PROJECT_ID
) {
  throw new Error(
    'Please make sure that all environment variables are provided'
  );
}

const client = new Client();
client.setEndpoint(APPWRITE_API_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const GET: APIRoute = async () => {
  try {
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID
    );

    return new Response(
      JSON.stringify({
        total: data.total,
        documents: data.documents.map(mapDocuments),
      })
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    try {
      const body = await request.json();

      const result = await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        ID.unique(),
        body
      );
      return new Response(JSON.stringify(mapDocuments(result)));
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 422 });
    }
  }

  return new Response(null, { status: 400 });
};

function mapDocuments(document: Models.Document) {
  const { $id, $createdAt, $updatedAt, code, title, description, MTN, Airtel } =
    document;

  return { $id, $createdAt, $updatedAt, code, title, description, MTN, Airtel };
}
