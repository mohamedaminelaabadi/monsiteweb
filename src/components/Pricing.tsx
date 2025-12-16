import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'PACK 1',
    duration: '6 mois',
    price: '150',
    featured: false,
    slug: 'box6',
  },
  {
    name: 'PACK 2',
    duration: '12 mois',
    price: '200',
    featured: true,
    badge: 'OFFRE SPÉCIALE',
    slug: 'box12',
  },
  {
    name: 'PACK 3',
    duration: '24 mois',
    price: '350',
    featured: false,
    slug: 'box24',
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="tarifs" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02]
                ${
                  plan.featured
                    ? 'border-orange-500 bg-gradient-to-br from-orange-900/40 to-black scale-105'
                    : 'border-border bg-card'
                }`}
            >
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-400 text-black text-xs font-bold px-4 py-1 rounded-full pointer-events-none">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-center text-muted-foreground mb-6">{plan.duration}</p>

              <div className="text-center mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-lg ml-1 text-muted-foreground">DH</span>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                <li>✔ +11 000 chaînes en direct</li>
                <li>✔ +135 000 films & séries en HD/4K</li>
                <li>✔ Fonctionne sur tous les appareils</li>
                <li>✔ Activation immédiate</li>
                <li>✔ Support 24/7</li>
              </ul>

              <button
                type="button"
                onClick={() => navigate(`/checkout?plan=${plan.slug}`)}
                className={`relative z-10 w-full py-3 rounded-xl font-semibold transition-colors
                  ${
                    plan.featured
                      ? 'bg-orange-500 hover:bg-orange-600 text-black'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
              >
                Découvrir l’offre
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
