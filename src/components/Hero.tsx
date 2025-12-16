import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="max-w-3xl pt-20 md:pt-24 pb-12">
          <span className="badge-new mb-6 inline-block">Nouveau 2025</span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-tight mb-6">
            Ne compliquez pas votre TV.{' '}
            <span className="text-gradient">Tout ce que vous aimez,</span>{' '}
            dans une seule application.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            TV en direct, films, séries, sport et contenus pour enfants. 
            Plus de 18 000 chaînes et 135 000 films & séries en HD/4K.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/checkout?plan=box12" className="btn-primary animate-glow">
              S'abonner maintenant
            </a>
            <a href="#pricing" className="btn-outline">
              Voir les offres
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-12">
            <div>
              <p className="text-3xl font-display text-foreground">+18K</p>
              <p className="text-sm text-muted-foreground">Chaînes</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-display text-foreground">+135K</p>
              <p className="text-sm text-muted-foreground">Films & Séries</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-display text-foreground">4K</p>
              <p className="text-sm text-muted-foreground">Ultra HD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
