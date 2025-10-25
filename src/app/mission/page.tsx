import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function MissionPage() {
  const missionImage = PlaceHolderImages.find((p) => p.id === 'seaweed-harvest');

  const missionPoints = [
    'Sustainably harvest nutrient-rich seaweed to create delicious, healthy snacks.',
    'Protect and restore marine ecosystems through responsible practices.',
    'Empower local coastal communities by providing fair-wage employment.',
    'Reduce our environmental impact with eco-friendly packaging and production.',
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Mission</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          At OceanBite, we are dedicated to making a positive impact on the
          planet and its people, one cookie at a time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Healthy Planet, Healthy You
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our core mission is to bridge the gap between delicious, healthy
            food and environmental conservation. We believe that what we eat
            should not only nourish our bodies but also contribute positively to
            the world around us. By using seaweed, a remarkable and sustainable
            resource, we create cookies that are packed with flavor and
            nutrients.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This approach allows us to actively participate in the preservation
            of marine biodiversity. We work closely with marine biologists and
            local communities to ensure our harvesting methods are regenerative,
            helping to maintain the delicate balance of ocean ecosystems.
          </p>
        </div>
        <div>
          {missionImage && (
            <Image
              src={missionImage.imageUrl}
              alt={missionImage.description}
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              data-ai-hint={missionImage.imageHint}
            />
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              Our Commitments
            </h3>
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
