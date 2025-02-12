import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly ordersService: OrdersService) {
    this.stripe = new Stripe(
      'key',
      {
        apiVersion: '2024-11-20.acacia',
      },
    );
  }

  async createStripeCheckoutSession(orderId: number) {
    const order = await this.ordersService.findOne(orderId);

    if (!order || !order.items || !Array.isArray(order.items)) {
      throw new Error('Commande introuvable ou items manquants');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url:
      'http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:8080/cancel',

    });

    return session;
  }
}