import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const prequalifySchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    companyName: z.string().min(2, 'Company name is required'),
    ein: z.string().regex(/^\d{2}-?\d{7}$/, 'Must be a valid EIN format (XX-XXXXXXX)'),
    income: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().min(0, 'Income must be a positive number')),
    debts: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().min(0, 'Debts must be a positive number')),
    creditInquiries: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().min(0, 'Inquiries must be a positive number')),
})

export type PrequalifyInput = z.infer<typeof prequalifySchema>

export const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>
