import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeartPulse, Recycle, Users } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  const values = [
    {
      icon: <Recycle className="h-10 w-10 text-primary" />,
      title: 'Sustainability First',
      description:
        'Our cookies are made from sustainably harvested seaweed, reducing our carbon footprint and promoting healthy oceans.',
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Community Impact',
      description:
        'We partner with local coastal communities, providing fair-wage jobs and supporting local economies.',
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-primary" />,
      title: 'Health Benefits',
      description:
        "Seaweed is a superfood packed with vitamins and minerals. Enjoy a delicious snack that's good for you and the planet.",
    },
  ];

  return (
    <div className="flex flex-col animate-fade-in">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl p-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Tasting the Ocean, Preserving the Future.
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl">
            Welcome to OceanBite, where every delicious cookie is a step towards
            a healthier planet. We craft our unique treats from nutritious
            seaweed, supporting marine conservation with every bite.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/partner">Order Now</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/mission">Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="values" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose OceanBite?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're more than just a cookie company. We're a movement for a
              sustainable future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card
                key={value.title}
                className="text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl flex flex-col"
              >
                <CardHeader className="flex flex-col items-center gap-4">
                  {value.icon}
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
