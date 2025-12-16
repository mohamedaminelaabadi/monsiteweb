const platforms = [
  'DAZN', 'Disney+', 'Eurosport', 'HBO', 'Hulu', 'Netflix', 'Prime Video', 'Apple TV+'
];

const Platforms = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
            Tout votre divertissement au même endroit
          </h2>
          <p className="text-muted-foreground">
            Accédez à toutes vos plateformes préférées
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {platforms.map((platform) => (
            <div
              key={platform}
              className="px-6 py-4 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <span className="text-foreground font-semibold">{platform}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
