'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const partnerSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    organization: z.string().min(2, { message: 'Organization name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const newsletterSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
});


export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'There was an error with your submission. Please check the fields and try again.',
    };
  }

  console.log('New Contact Form Submission:', validatedFields.data);

  return { message: 'Thank you for your message! We will get back to you soon.' };
}

export async function submitPartnerForm(prevState: any, formData: FormData) {
    const validatedFields = partnerSchema.safeParse({
      name: formData.get('name'),
      organization: formData.get('organization'),
      email: formData.get('email'),
      message: formData.get('message'),
    });
  
    if (!validatedFields.success) {
      return {
        message: 'There was an error with your submission. Please check the fields and try again.',
      };
    }
  
    console.log('New Partner Form Submission:', validatedFields.data);
  
    return { message: 'Thank you for your interest! We will review your partnership request and be in touch.' };
  }
  
export async function submitNewsletter(prevState: any, formData: FormData) {
    const validatedFields = newsletterSchema.safeParse({
        email: formData.get('email'),
    });
    
    if (!validatedFields.success) {
        return {
        message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid email.',
        };
    }
    
    console.log('New Newsletter Subscription:', validatedFields.data.email);
    
    return { message: 'Thank you for subscribing to our newsletter!' };
}
