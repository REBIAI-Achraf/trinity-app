import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async getSalesReport(startDate: Date, endDate: Date): Promise<any> {
    const sales = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'totalSales')
      .addSelect('COUNT(order.id)', 'totalOrders')
      .where('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return {
      totalSales: sales.totalSales,
      totalOrders: sales.totalOrders,
    };
  }

  async getAnalytics(): Promise<any> {
    const totalRevenue = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'totalRevenue')
      .getRawOne();

    const totalOrders = await this.ordersRepository
      .createQueryBuilder('order')
      .select('COUNT(order.id)', 'totalOrders')
      .getRawOne();

    return {
      totalRevenue: totalRevenue.totalRevenue,
      totalOrders: totalOrders.totalOrders,
    };
  }
}
