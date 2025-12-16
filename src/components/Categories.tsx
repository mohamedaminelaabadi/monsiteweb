import heroFootball from '@/assets/hero-football.jpg';
import heroChampions from '@/assets/champions-league.jpg';
import heroMovies from '@/assets/hero-movies.jpg';
import heroKids from '@/assets/hero-kids.jpg';

const categories = [
  {
    id: 1,
    title: 'Premier League',
    description: 'Tous les matchs en direct et en HD',
    image: heroFootball,
    tag: 'Sport',
  },
  {
    id: 2,
    title: 'Ligue des Champions',
    description: 'Les plus grands clubs européens',
    image: heroChampions,
    tag: 'Sport',
  },
  {
    id: 3,
    title: 'Films & Séries',
    description: 'Plus de 135 000 contenus en 4K',
    image: heroMovies,
    tag: 'Cinéma',
  },
  {
    id: 4,
    title: 'Univers Enfants',
    description: 'Dessins animés et programmes éducatifs',
    image: heroKids,
    tag: 'Famille',
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Tout votre divertissement</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sport, cinéma, séries et programmes pour toute la famille
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card-premium group cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute top-3 left-3 badge-accent">{category.tag}</span>
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
