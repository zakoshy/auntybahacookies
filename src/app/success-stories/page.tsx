import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 'happy-customer-1',
      type: 'Customer',
      name: 'Sarah L.',
      quote: "OceanBite cookies are my go-to snack! They're delicious, and I love knowing that I'm supporting a company that truly cares about the environment.",
    },
    {
      id: 'local-fishermen',
      type: 'Partner',
      name: 'Coastal Fisherman\'s Co-op',
      quote: "Partnering with OceanBite has been a game-changer. They've helped us diversify our income and get involved in coral restoration projects. It's a win-win.",
    },
    {
      id: 'happy-customer-2',
      type: 'Customer',
      name: 'Mike R.',
      quote: 'I was skeptical about seaweed cookies, but I\'m a convert! The taste is unique and savory. My kids love them too.',
    },
  ];

  const milestones = [
    {
      value: '10,000+',
      label: 'kgs of seaweed sustainably harvested',
    },
    {
      value: '5',
      label: 'coastal communities empowered',
    },
    {
      value: '2',
      label: 'coral restoration projects funded',
    },
    {
      value: '1M+',
      label: 'cookies sold to happy customers',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Success Stories</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          The ripple effect of a single cookie is bigger than you think. Here are some of the stories that inspire us every day.
        </p>
      </div>

      <section id="milestones" className="mb-16 md:mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {milestones.map((milestone) => (
            <div key={milestone.label} className="p-4 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-primary">{milestone.value}</p>
              <p className="mt-2 text-muted-foreground">{milestone.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => {
            const image = PlaceHolderImages.find((p) => p.id === story.id);
            return (
              <Card key={story.id} className="flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary/50" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-foreground">
                    "{story.quote}"
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="font-semibold">{story.name}</p>
                  <Badge variant={story.type === 'Customer' ? 'secondary' : 'default'}>{story.type}</Badge>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
