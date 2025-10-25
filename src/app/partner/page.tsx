'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { submitPartnerForm } from '@/lib/actions';
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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Handshake, Heart, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  organization: z.string().min(2, { message: 'Organization name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Submitting...' : 'Become a Partner'}
    </Button>
  );
}

const MpesaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 256 256"
    className="h-6 w-6"
  >
    <path
      fill="currentColor"
      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m48.33 133.58l-20-40a8 8 0 0 0-14.66 7.32L152.23 144H104l-11.83-23.66a8 8 0 0 0-14.66 7.32l20 40a8 8 0 0 0 14.66-7.32L101.77 144h48.46l11.83 23.66a8 8 0 0 0 14.66-7.32"
    />
  </svg>
);

const PayPalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="h-6 w-6"
  >
    <path
      fill="currentColor"
      d="M8.05 4.303a.53.53 0 0 0-.529.524v14.346c0 .29.239.528.53.528h3.966c3.21 0 5.234-1.54 5.72-4.632.066-.42.103-.85.11-1.284.095-1.92-.72-3.32-2.31-4.042 1.297-1.103 1.83-2.613 1.54-4.397-.31-1.92-1.78-3.04-4.14-3.04H8.05zm2.84 5.587h.804c1.28 0 2.053.513 1.88 1.94-.15 1.25-.97 1.76-2.14 1.76h-.545V9.89zm.208-4.22h.47c1.03 0 1.63.41 1.48 1.52c-.13 1.01-.79 1.4-1.68 1.4h-.27v-2.92z"
    />
  </svg>
);

export default function PartnerPage() {
  const [state, formAction] = useActionState(submitPartnerForm, { message: '' });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      organization: '',
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

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Join Our Mission</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Collaboration is key to creating lasting change. Partner with us to amplify our impact on marine conservation and community support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Handshake className="h-10 w-10 text-primary"/>
            </div>
            <CardTitle className="text-3xl">Become a Partner</CardTitle>
            <CardDescription>
              Are you an NGO, an eco-initiative, or a local group passionate about our oceans? Let's work together.
            </CardDescription>
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
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ocean Savers Inc." {...field} />
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
                        <Input placeholder="john@example.com" {...field} />
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
                        <Textarea placeholder="Tell us how we can collaborate..." {...field} />
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

        <Card className="shadow-lg bg-secondary/50 flex flex-col justify-center">
          <CardHeader className="text-center">
             <div className="flex justify-center mb-2">
              <Heart className="h-10 w-10 text-primary"/>
            </div>
            <CardTitle className="text-3xl">Make a Donation</CardTitle>
            <CardDescription>
              Your support helps us fund critical marine conservation projects and support our partner communities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Every donation, no matter the size, contributes to a healthier ocean. 100% of your contribution goes directly to our conservation and community funds.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="w-full text-lg px-8 py-6">
                <PayPalIcon />
                Donate with PayPal
              </Button>
               <Button size="lg" className="w-full text-lg px-8 py-6">
                <CreditCard />
                Donate with Mastercard
              </Button>
               <Button size="lg" className="w-full text-lg px-8 py-6">
                <MpesaIcon />
                Donate with M-Pesa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
