import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mohammed A.',
    city: 'Casablanca',
    rating: 5,
    text: "Service impeccable ! La qualité d'image est incroyable et je n'ai jamais eu de coupure. Je recommande à 100%.",
  },
  {
    id: 2,
    name: 'Fatima B.',
    city: 'Rabat',
    rating: 5,
    text: "Mes enfants adorent les programmes jeunesse. L'interface est simple et tout fonctionne parfaitement sur notre Smart TV.",
  },
  {
    id: 3,
    name: 'Youssef M.',
    city: 'Marrakech',
    rating: 5,
    text: "En tant que fan de foot, je suis comblé. Tous les matchs de Premier League et Champions League en direct !",
  },
  {
    id: 4,
    name: 'Sara K.',
    city: 'Fès',
    rating: 4,
    text: "Excellent rapport qualité-prix. Le support client est très réactif et disponible à tout moment.",
  },
  {
    id: 5,
    name: 'Ahmed R.',
    city: 'Tanger',
    rating: 5,
    text: "J'ai essayé plusieurs services IPTV et BOX+ est de loin le meilleur. Stable, rapide et un catalogue énorme.",
  },
  {
    id: 6,
    name: 'Nadia L.',
    city: 'Agadir',
    rating: 5,
    text: "Activation en 2 minutes chrono ! Toute la famille est satisfaite. Merci BOX+ !",
  },
];

const stats = [
  { value: '≤ 2h', label: 'Temps de réponse support' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '+50K', label: 'Clients satisfaits' },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Avis de nos clients</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ce que pensent nos utilisateurs de BOX+
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-accent fill-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
