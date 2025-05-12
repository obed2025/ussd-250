import type { Models } from 'node-appwrite';

export interface Code extends Models.Document {
  code: string;
  title: string;
  description: string;
  MTN: boolean;
  Airtel: boolean;
}
