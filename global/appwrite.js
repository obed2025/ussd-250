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
