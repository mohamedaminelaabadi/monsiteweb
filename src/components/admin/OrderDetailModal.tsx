import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (status: OrderStatus) => void;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const OrderDetailModal = ({ order, onClose, onStatusChange }: OrderDetailModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Commande #{order.order_number}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Informations client</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Nom</span>
                <span className="font-medium">{order.first_name} {order.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Téléphone</span>
                <span className="font-medium">{order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ville</span>
                <span className="font-medium">{order.city}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Détails de la commande</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Offre</span>
                <span className="font-medium">{order.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Durée</span>
                <span className="font-medium">{order.plan_duration} mois</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Écrans</span>
                <span className="font-medium">{order.screens}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Prix de base</span>
                <span className="font-medium">{Number(order.base_price).toFixed(2)} DH</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold">{Number(order.total_price).toFixed(2)} DH</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Date */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date de commande</span>
            <span>{formatDate(order.created_at)}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {order.status !== 'confirmed' && (
              <Button
                onClick={() => onStatusChange('confirmed')}
                variant="outline"
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmer
              </Button>
            )}
            {order.status !== 'delivered' && (
              <Button
                onClick={() => onStatusChange('delivered')}
                variant="outline"
                className="flex-1"
              >
                <Truck className="w-4 h-4 mr-2" />
                Livrer
              </Button>
            )}
            {order.status !== 'cancelled' && (
              <Button
                onClick={() => onStatusChange('cancelled')}
                variant="outline"
                className="flex-1 text-red-500 hover:text-red-600"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
