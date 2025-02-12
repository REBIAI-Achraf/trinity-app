import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../orders/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async generateInvoice(orderId: number): Promise<string> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const invoicePath = `invoices/invoice_${order.id}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(invoicePath));

    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Order ID: ${order.id}`);
    doc.text(`Customer Name: ${(order.user as any).name}`);
    doc.text(`Customer Email: ${order.user.email}`);
    doc.moveDown();

    doc.fontSize(16).text('Items:');
    order.items.forEach((item) => {
      doc.text(
        `${item.product.name} - Quantity: ${item.quantity} - Price: ${item.price}`,
      );
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: ${order.total}`);
    doc.text(`Date: ${order.createdAt}`);

    doc.end();

    return invoicePath;
  }
}
