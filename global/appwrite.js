import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
} from './consts.js';

const { Client, Databases } = Appwrite;
const client = new Client();
client.setEndpoint(APPWRITE_API_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function getAllCodes() {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID
  );

  return result;
}

export async function createCode(data) {
  const id = Math.random().toString(36).substring(2, 9);

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    id,
    data
  );

  return result;
}
