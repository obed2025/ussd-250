import { Client, Databases, ID, Query, type Models } from 'node-appwrite';
import type { Code } from './types';

const {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
} = import.meta.env;

const databases = (() => {
  try {
    const client = new Client();
    client.setEndpoint(APPWRITE_API_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    return new Databases(client);
  } catch (error) {
    return new Error('Something went wrong while creating Databases instance.');
  }
})();

if (databases instanceof Error) throw databases;

export const getCodes = async (n: number = 1) => {
  return await databases?.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [Query.orderDesc('$updatedAt'), Query.limit(25), Query.offset((n - 1) * 25)]
  );
};

export const getMTNCodes = async () => {
  return await databases?.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [Query.equal('MTN', [true])]
  );
};

export const getAirtelCodes = async () => {
  return await databases?.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [Query.equal('Airtel', [true])]
  );
};

export const createCode = async (params: Object) =>
  await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    ID.unique(),
    params
  );

export const getSearchResults = async (query: string) => {
  return (await databases?.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [
      Query.or([
        Query.contains('title', query),
        Query.contains('code', query),
        Query.contains('description', query),
      ]),
    ]
  )) as Models.DocumentList<Code>;
};
