'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, { message: '' });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message.includes('Thank you') ? 'Success!' : 'Error',
        description: state.message,
        variant: state.message.includes('Thank you') ? 'default' : 'destructive',
      });
      if (state.message.includes('Thank you')) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  const contactDetails = [
    { icon: <Phone className="h-5 w-5 text-primary" />, text: '(123) 456-7890' },
    { icon: <Mail className="h-5 w-5 text-primary" />, text: 'hello@oceanbite.com' },
    { icon: <MapPin className="h-5 w-5 text-primary" />, text: '123 Ocean Ave, Seaside, CA 90210' },
  ];
  
  const socialLinks = [
    { icon: <Instagram />, href: '#', name: 'Instagram' },
    { icon: <Facebook />, href: '#', name: 'Facebook' },
    { icon: <Linkedin />, href: '#', name: 'LinkedIn' },
    { icon: <Youtube />, href: '#', name: 'YouTube' },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions, ideas, or just want to say hello? We'd love to hear from you.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SubmitButton />
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-4">
                  {detail.icon}
                  <span className="text-muted-foreground">{detail.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                  <Button key={link.name} variant="outline" size="icon" asChild>
                    <Link href={link.href} aria-label={link.name}>
                      {link.icon}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
