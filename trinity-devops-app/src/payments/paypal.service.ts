import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaypalService {
  private readonly environment: paypal.core.SandboxEnvironment;
  private readonly client: paypal.core.PayPalHttpClient;

  constructor(private readonly ordersService: OrdersService) {
    this.environment = new paypal.core.SandboxEnvironment(
      'd.jefffots@yahoo.fr',
      'Genese2.1717',
    );
    this.client = new paypal.core.PayPalHttpClient(this.environment);
  }

  async createOrder(orderId: number) {
    const order = await this.ordersService.findOne(orderId);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.total.toString(),
          },
        },
      ],
    });

    const response = await this.client.execute(request);
    return response.result;
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await this.client.execute(request);
    return response.result;
  }
}
