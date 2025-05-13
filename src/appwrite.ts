import { Client, Databases, ID } from 'node-appwrite';

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

export const getCodes = async () => {
  return await databases?.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID
  );
};

export const createCode = async (params: Object) =>
  await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    ID.unique(),
    params
  );
