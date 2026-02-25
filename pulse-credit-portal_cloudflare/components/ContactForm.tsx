'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactInput } from '@/lib/schemas'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = (data: ContactInput) => {
        console.log('Form Data:', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    {...register('name')}
                    className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                    placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    {...register('email')}
                    className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                    placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                    {...register('message')}
                    className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                    placeholder="Your message here..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            >
                Send Message
            </button>
        </form>
    )
}
