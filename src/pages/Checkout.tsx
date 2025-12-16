import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const plans = {
  box6: { name: 'BOX+ 6', duration: '6 mois', basePrice: 150, months: 6 },
  box12: { name: 'BOX+ 12', duration: '12 mois', basePrice: 200, months: 12 },
  box24: { name: 'BOX+ 24', duration: '24 mois', basePrice: 350, months: 24 },
};

const screenPrices = {
  1: 0,
  2: 50,
  3: 90,
  4: 120,
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialPlan = searchParams.get('plan') || 'box12';
  
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans>(
    initialPlan in plans ? (initialPlan as keyof typeof plans) : 'box12'
  );
  const [screens, setScreens] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    ville: '',
  });

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam && planParam in plans) {
      setSelectedPlan(planParam as keyof typeof plans);
    }
  }, [searchParams]);

  const currentPlan = plans[selectedPlan];
  const screenExtra = screenPrices[screens as keyof typeof screenPrices];
  const total = currentPlan.basePrice + screenExtra;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.email || !formData.ville) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('orders').insert({
        first_name: formData.prenom,
        last_name: formData.nom,
        phone: formData.telephone,
        email: formData.email,
        city: formData.ville,
        plan: currentPlan.name,
        plan_duration: currentPlan.months,
        screens: screens,
        base_price: currentPlan.basePrice,
        total_price: total,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: "Commande confirmée !",
        description: `Votre abonnement ${currentPlan.name} a été enregistré. Vous recevrez vos accès par email.`,
      });

      setTimeout(() => navigate('/'), 3000);
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la commande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header simple */}
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <a href="/" className="text-2xl font-bold text-gray-900">
            BOX<span className="text-gray-500">+</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Finaliser votre commande</h1>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Colonne droite - Choisir le produit */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Choisir le produit</h2>

              {/* Sélection durée */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Durée de l'abonnement</label>
                <div className="grid grid-cols-3 gap-3">
                  {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        selectedPlan === key
                          ? 'border-gray-900 bg-gray-100'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {selectedPlan === key && (
                        <Check className="absolute top-2 right-2 w-4 h-4 text-gray-700" />
                      )}
                      <span className="block text-sm font-medium text-gray-900">{plans[key].duration}</span>
                      <span className="block text-xs text-gray-500 mt-1">{plans[key].basePrice} DH</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection écrans */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Nombre d'écrans</label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setScreens(num)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        screens === num
                          ? 'border-gray-900 bg-gray-100'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {screens === num && (
                        <Check className="absolute top-2 right-2 w-4 h-4 text-gray-700" />
                      )}
                      <span className="block text-lg font-medium text-gray-900">{num}</span>
                      <span className="block text-xs text-gray-500">
                        {num === 1 ? 'Inclus' : `+${screenPrices[num as keyof typeof screenPrices]} DH`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne gauche - Résumé */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Résumé de commande</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>{currentPlan.name} ({currentPlan.duration})</span>
                  <span>{currentPlan.basePrice} DH</span>
                </div>

                {screens > 1 && (
                  <div className="flex justify-between text-gray-700">
                    <span>{screens} écrans</span>
                    <span>+{screenExtra} DH</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{total} DH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations personnelles</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
                    placeholder="Casablanca, Rabat..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Traitement en cours...' : 'Passer la commande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;