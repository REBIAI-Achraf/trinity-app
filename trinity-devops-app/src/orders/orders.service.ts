import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { Product } from '../products/product.entity'; // Import de Product
import { OrderItem } from './order.entity'; // Import de OrderItem

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly usersService: UsersService, // Injection du service utilisateur
  ) {}

  // async create(createOrderDto: CreateOrderDto): Promise<Order> {
  //   const { userId, ...orderData } = createOrderDto;

  //   const user = await this.usersService.findOneById(userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const order = this.ordersRepository.create({ ...orderData, user });
  //   return this.ordersRepository.save(order);
  // }
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items, ...orderData } = createOrderDto;

    // Vérifie si l'utilisateur existe
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Créer la commande sans les items pour l'instant
    const order = this.ordersRepository.create({ ...orderData, user });
    await this.ordersRepository.save(order);

    // Associer les produits aux items et les sauvegarder
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await this.productsRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Product with ID ${item.productId} not found`,
          );
        }

        const orderItem = this.orderItemsRepository.create({
          order,
          product,
          quantity: item.quantity,
          price: item.price,
        });

        return this.orderItemsRepository.save(orderItem);
      }),
    );

    // Associer les items à la commande
    order.items = orderItems;
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOrdersByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  // async findOne(id: number): Promise<Order> {
  //   const order = await this.ordersRepository.findOne({ where: { id } });
  //   if (!order) {
  //     throw new NotFoundException(`Order with ID ${id} not found`);
  //   }
  //   return order;
  // }
  async findOne(orderId: number) {
    return this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'], // Assurez-vous de charger les articles et produits
    });
  }
  

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.preload({
      id: id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }


}
