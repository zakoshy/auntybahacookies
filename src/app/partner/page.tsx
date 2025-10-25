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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Handshake, Heart, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const partnerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  organization: z.string().min(2, { message: 'Organization name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const creditCardSchema = z.object({
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), 'Invalid card number'),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), 'Invalid expiry date (MM/YY)'),
  cvv: z.string().refine((val) => /^\d{3,4}$/.test(val), 'Invalid CVV'),
  name: z.string().min(2, 'Name is required'),
});

const mpesaSchema = z.object({
  phone: z.string().refine((val) => /^\d{10,12}$/.test(val), 'Invalid phone number'),
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

function DonationForm({
  selectedPayment,
  onBack,
}: {
  selectedPayment: 'paypal' | 'mastercard' | 'mpesa';
  onBack: () => void;
}) {
  const { toast } = useToast();
  const [amount, setAmount] = useState('25');

  const creditCardForm = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: { cardNumber: '', expiryDate: '', cvv: '', name: '' },
  });

  const mpesaForm = useForm<z.infer<typeof mpesaSchema>>({
    resolver: zodResolver(mpesaSchema),
    defaultValues: { phone: '' },
  });

  const handleDonation = (values: any) => {
    console.log('Processing donation...', { amount, paymentMethod: selectedPayment, details: values });
    toast({
      title: 'Donation Submitted!',
      description: `Thank you for your generous donation of $${amount}!`,
    });
  };
  
  const handlePayPalDonation = () => {
    console.log('Redirecting to PayPal...', { amount });
     toast({
      title: 'Redirecting to PayPal',
      description: `You are being redirected to complete your $${amount} donation.`,
    });
  }

  const renderForm = () => {
    switch (selectedPayment) {
      case 'mastercard':
        return (
          <Form {...creditCardForm}>
            <form onSubmit={creditCardForm.handleSubmit(handleDonation)} className="space-y-4">
              <FormField control={creditCardForm.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl><Input {...field} placeholder="Jane Doe" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={creditCardForm.control} name="cardNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl><Input {...field} placeholder="0000 0000 0000 0000" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={creditCardForm.control} name="expiryDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry</FormLabel>
                      <FormControl><Input {...field} placeholder="MM/YY" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={creditCardForm.control} name="cvv" render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl><Input {...field} placeholder="123" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">Donate ${amount}</Button>
            </form>
          </Form>
        );
      case 'mpesa':
        return (
          <Form {...mpesaForm}>
            <form onSubmit={mpesaForm.handleSubmit(handleDonation)} className="space-y-4">
              <p className="text-sm text-muted-foreground">A payment prompt will be sent to your phone to complete the transaction.</p>
              <FormField control={mpesaForm.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>M-Pesa Phone Number</FormLabel>
                    <FormControl><Input {...field} placeholder="254712345678" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Donate ${amount}</Button>
            </form>
          </Form>
        );
      case 'paypal':
        return (
            <div className="text-center">
                <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your donation securely.</p>
                <Button onClick={handlePayPalDonation} className="w-full">
                    Proceed to PayPal
                </Button>
            </div>
        )
      default:
        return null;
    }
  };
  
  const paymentMethodTitle = {
      paypal: "PayPal",
      mastercard: "Mastercard",
      mpesa: "M-Pesa"
  }

  return (
    <div className="space-y-4">
       <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft/></Button>
            <h3 className="text-lg font-semibold">Donate with {paymentMethodTitle[selectedPayment]}</h3>
        </div>

      <div className="flex justify-center gap-2 mb-6">
        {['10', '25', '50', '100'].map((val) => (
          <Button key={val} variant={amount === val ? 'default' : 'outline'} onClick={() => setAmount(val)}>
            ${val}
          </Button>
        ))}
      </div>
      {renderForm()}
    </div>
  );
}


export default function PartnerPage() {
  const [state, formAction] = useActionState(submitPartnerForm, { message: '' });
  const [paymentStep, setPaymentStep] = useState<'options' | 'form'>('options');
  const [selectedPayment, setSelectedPayment] = useState<'paypal' | 'mastercard' | 'mpesa' | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof partnerFormSchema>>({
    resolver: zodResolver(partnerFormSchema),
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

  const handlePaymentSelect = (method: 'paypal' | 'mastercard' | 'mpesa') => {
    setSelectedPayment(method);
    setPaymentStep('form');
  };

  const resetDonationFlow = () => {
    setPaymentStep('options');
    setSelectedPayment(null);
  }

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
            <Dialog onOpenChange={resetDonationFlow}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg px-8 py-6">
                  Donate Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                  <DialogDescription>
                    Choose your preferred payment method.
                  </DialogDescription>
                </DialogHeader>
                {paymentStep === 'options' && (
                   <div className="space-y-4 py-4">
                    <Button onClick={() => handlePaymentSelect('paypal')} size="lg" className="w-full text-lg justify-start">
                        <PayPalIcon />
                        Donate with PayPal
                    </Button>
                    <Button onClick={() => handlePaymentSelect('mastercard')} size="lg" className="w-full text-lg justify-start">
                        <CreditCard />
                        Donate with Mastercard
                    </Button>
                    <Button onClick={() => handlePaymentSelect('mpesa')} size="lg" className="w-full text-lg justify-start">
                        <MpesaIcon />
                        Donate with M-Pesa
                    </Button>
                </div>
                )}
                {paymentStep === 'form' && selectedPayment && (
                    <DonationForm selectedPayment={selectedPayment} onBack={resetDonationFlow} />
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
