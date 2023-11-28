import { defineCollection, z } from 'astro:content'

const places = defineCollection({
  type: 'data',
  schema: z.object({
    places: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        arrivalDate: z.string(),
        departureDate: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        miles: z.number(),
        location: z.string().optional(),
        url: z.string(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
      }),
    ),
  }),
})

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.union([z.literal('note'), z.literal('post'), z.literal('page')]),
    tags: z.array(z.string()),
    excerpt: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    cover: z.string().nullish(),
    icon: z.string().nullish(),
    title: z.string(),
  }),
})

const collections = {
  places,
  posts,
}

export { collections }
