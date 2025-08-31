import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: '1.docs/**/*',
      type: 'page',
    }),
    changelog: defineCollection({
      source: '4.changelog.yml',
      type: 'page',
    }),
    versions: defineCollection({
      source: '4.changelog/**/*',
      type: 'page',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string(),
        date: z.date(),
        image: z.string(),
      }),
    }),
  },
},
)
