import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle, Truck, XCircle, DollarSign } from 'lucide-react';

interface OrderStats {
  total: number;
  today: number;
  revenue: number;
  pending: number;
  confirmed: number;
  delivered: number;
  cancelled: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    today: 0,
    revenue: 0,
    pending: 0,
    confirmed: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*');

      if (error) throw error;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayOrders = orders?.filter(order => {
        const orderDate = new Date(order.created_at);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      }) || [];

      setStats({
        total: orders?.length || 0,
        today: todayOrders.length,
        revenue: orders?.reduce((sum, order) => sum + Number(order.total_price), 0) || 0,
        pending: orders?.filter(o => o.status === 'pending').length || 0,
        confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
        delivered: orders?.filter(o => o.status === 'delivered').length || 0,
        cancelled: orders?.filter(o => o.status === 'cancelled').length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total commandes',
      value: stats.total,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: "Commandes aujourd'hui",
      value: stats.today,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      title: "Chiffre d'affaires",
      value: `${stats.revenue.toFixed(2)} DH`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
  ];

  const statusCards = [
    {
      title: 'En attente',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Confirmées',
      value: stats.confirmed,
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      title: 'Livrées',
      value: stats.delivered,
      icon: Truck,
      color: 'bg-green-500',
    },
    {
      title: 'Annulées',
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statuts des commandes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusCards.map((card) => (
            <Card key={card.title} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs text-gray-500">{card.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
