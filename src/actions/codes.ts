import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createCode } from '../appwrite';

export default {
  new: defineAction({
    accept: 'form',
    input: z.object({
      code: z.string().regex(/^\*(\d{3})(\*\d+)*#$|^\d{3}(\*\d+)*$/),
      title: z.string(),
      description: z.optional(z.string()),
      MTN: z.optional(z.boolean()),
      Airtel: z.optional(z.boolean()),
    }),
    handler: async (input) => {
      try {
        await createCode(input);
      } catch (err) {
        console.log(err);
      }
    },
  }),
};
