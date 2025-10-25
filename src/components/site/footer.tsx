'use client';

import { useFormState, useFormStatus } from 'react-dom';
import * as z from 'zod';
import { submitNewsletter } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  );
}

export function SiteFooter() {
  const [state, formAction] = useFormState(submitNewsletter, { message: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message.includes('Thank you') ? 'Success!' : 'Error',
        description: state.message,
        variant: state.message.includes('Thank you') ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  const navLinks = [
    { href: '/mission', label: 'Our Mission' },
    { href: '/vision', label: 'Our Vision' },
    { href: '/partner', label: 'Partnerships' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const socialLinks = [
    { icon: <Instagram />, href: '#', name: 'Instagram' },
    { icon: <Facebook />, href: '#', name: 'Facebook' },
    { icon: <Linkedin />, href: '#', name: 'LinkedIn' },
    { icon: <Youtube />, href: '#', name: 'YouTube' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Delicious cookies made from seaweed, supporting a healthier ocean with every bite.
            </p>
             <div className="flex space-x-4 mt-4">
                {socialLinks.map(link => (
                  <Button key={link.name} variant="ghost" size="icon" asChild>
                    <Link href={link.href} aria-label={link.name}>
                      {link.icon}
                    </Link>
                  </Button>
                ))}
              </div>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Join our Newsletter</h3>
            <p className="text-muted-foreground mb-4">Get updates on our mission and new products.</p>
            <form action={formAction} className="flex gap-2">
              <Input type="email" name="email" placeholder="your@email.com" required />
              <SubmitButton />
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OceanBite Cookies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
