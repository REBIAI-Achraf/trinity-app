import { Controller, Post, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaypalService } from './paypal.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly paypalService: PaypalService,
  ) {}

  // @Post('stripe/create-checkout-session/:orderId')
  // async createStripeCheckoutSession(@Param('orderId') orderId: string) {
  //   return this.paymentsService.createStripeCheckoutSession(Number(orderId));
  // }
  @Post('stripe/create-checkout-session/:orderId')
  async createStripeCheckoutSession(@Param('orderId') orderId: string) {
    const session = await this.paymentsService.createStripeCheckoutSession(
      Number(orderId),
    );
    return { url: session.url };
  }

  @Post('paypal/create-order/:orderId')
  createPaypalOrder(@Param('orderId') orderId: number) {
    return this.paypalService.createOrder(orderId);
  }

  @Post('paypal/capture-order/:orderId')
  capturePaypalOrder(@Param('orderId') orderId: string) {
    return this.paypalService.captureOrder(orderId);
  }
}
