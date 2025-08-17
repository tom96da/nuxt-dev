import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().int(),
  uid: z.uuidv4(),
  name: z.string().min(1),
  email: z.email(),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface User extends z.infer<typeof userSchema> {}

export const userFormSchema = userSchema.pick({
  name: true,
  email: true,
})
