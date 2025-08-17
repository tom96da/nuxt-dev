import { z } from 'zod'

export const groupSchema = z.object({
  id: z.number().int(),
  gid: z.uuidv4(),
  name: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  users: z.array(z.uuidv4()).optional(),
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Group extends z.infer<typeof groupSchema> {}
