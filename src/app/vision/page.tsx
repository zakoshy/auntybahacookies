import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Globe, Leaf, Zap } from 'lucide-react';

export default function VisionPage() {
  const visionImage = PlaceHolderImages.find((p) => p.id === 'coral-reef');

  const visionPillars = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Innovation',
      description: 'Continuously exploring new ways to create sustainable food products from ocean resources without harming the environment.',
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: 'Conservation',
      description: 'Becoming a global leader in funding and participating in marine conservation projects, from coral reef restoration to plastic cleanup.',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'Global Impact',
      description: 'Inspiring a worldwide movement towards sustainable food choices and creating a global community of ocean advocates.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Vision</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We envision a future where the food on our plates contributes to a thriving planet and flourishing oceans.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          {visionImage && (
            <Image
              src={visionImage.imageUrl}
              alt={visionImage.description}
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              data-ai-hint={visionImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            A World Fed by a Healthy Ocean
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our long-term dream is to foster a global shift in how we perceive and consume food. We see a world where sustainable aquaculture and responsible harvesting are the norms, not the exceptions. OceanBite aims to be at the forefront of this movement, demonstrating that business success and environmental stewardship can, and should, be deeply intertwined.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to pushing the boundaries of food science to unlock the full potential of marine botanicals, creating products that are not only delicious and healthy but also play a direct role in healing our oceans for generations to come.
          </p>
        </div>
      </div>

       <div className="mt-16 md:mt-24 text-center">
         <h3 className="text-3xl font-bold mb-10">Pillars of Our Vision</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visionPillars.map((pillar) => (
              <div key={pillar.title} className="p-6">
                <div className="flex justify-center mb-4">{pillar.icon}</div>
                <h4 className="text-2xl font-semibold mb-2">{pillar.title}</h4>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
}
