import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const movies = [
  { id: 1, title: 'Anyone But You', image: '/movie/anyone-but-you.jpg', year: '2025' },
  { id: 2, title: 'Boy Kills World', image: '/movie/boy-kills-world.jpg', year: '2025' },
  { id: 3, title: 'Civil War', image: '/movie/civil-war.jpg', year: '2025' },
  { id: 4, title: 'Dune Part Two', image: '/movie/dune-part-two.jpg', year: '2025' },
  { id: 5, title: 'Past Lives', image: '/movie/past-lives.jpg', year: '2025' },
  { id: 6, title: 'Talk To Me', image: '/movie/talk-to-me.jpg', year: '2025' },
  { id: 7, title: 'The Beekeeper', image: '/movie/the-beekeeper.jpg', year: '2025' },
  { id: 8, title: 'Twisters', image: '/movie/twisters.jpg', year: '2025' },
];

const MoviesCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="films" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title text-3xl md:text-4xl">Les derniers films 2025</h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-40 md:w-48 group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-56 md:h-72 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge-new text-[10px]">Nouveau</span>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>

              <h3 className="text-sm font-medium text-foreground truncate">{movie.title}</h3>
              <p className="text-xs text-muted-foreground">{movie.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesCarousel;
