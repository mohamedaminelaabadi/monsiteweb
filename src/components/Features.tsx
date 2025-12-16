import { Shield, Zap, Monitor, Tv, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Connexion sécurisée',
    description: 'Chiffrement SSL/TLS pour toutes les connexions.',
    badge: 'Fiable',
  },
  {
    icon: Zap,
    title: 'Serveurs ultra-rapides',
    description: 'Streaming stable même aux heures de pointe.',
    badge: '99,9% dispo',
  },
  {
    icon: Monitor,
    title: 'Multi-appareils',
    description: 'Compatible Smart TV, Android, iOS, Windows, Mac et boîtiers IPTV.',
  },
  {
    icon: Tv,
    title: '+18 000 chaînes',
    description: 'Chaînes du monde entier en HD/4K.',
  },
  {
    icon: Clock,
    title: 'Activation immédiate',
    description: 'Réception des accès en moins de 5 minutes.',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Une équipe disponible à tout moment.',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Les avantages de BOX+</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une expérience premium pour tous vos divertissements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    {feature.badge && (
                      <span className="badge-accent text-[10px]">{feature.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
