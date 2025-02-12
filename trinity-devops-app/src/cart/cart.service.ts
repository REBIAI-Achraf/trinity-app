import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly usersService: UsersService,
  ) {}

  async findOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });
    if (!cart) {
      const user = await this.usersService.findOneById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart = this.cartRepository.create({ user, items: [] });
      cart = await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addItem(
    userId: number,
    createCartItemDto: CreateCartItemDto,
  ): Promise<Cart> {
    // Récupérer ou créer un panier pour l'utilisateur
    const cart = await this.findOrCreateCart(userId);

    if (!cart.id) {
      throw new Error('Cart ID is undefined after creation.');
    }

    const { productId, quantity } = createCartItemDto;

    // Ajuster les valeurs pour correspondre à un int valide
    const adjustedProductId = Math.min(
      Math.max(parseInt(productId.toString().slice(0, 10), 10), -2147483648),
      2147483647,
    );

    const adjustedQuantity = Math.min(
      Math.max(parseInt(quantity.toString().slice(0, 10), 10), -2147483648),
      2147483647,
    );

    // Créer un nouvel élément de panier avec le cart complet
    const cartItem = this.cartItemRepository.create({
      cart, // Passez l'objet complet ici
      productId: adjustedProductId,
      quantity: adjustedQuantity,
    });

    console.log('Creating CartItem:', cartItem);

    // Sauvegarder l'élément de panier
    await this.cartItemRepository.save(cartItem);

    console.log('CartItem saved successfully.');

    // Retourner le panier mis à jour
    return this.cartRepository.findOne({
      where: { id: cart.id },
      relations: ['items'],
    });
  }

  async updateItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async removeItem(userId: number, cartItemId: number): Promise<Cart> {
    console.log(`Requête reçue pour supprimer un item : ${cartItemId}`);
    const cart = await this.findOrCreateCart(userId);
    console.log('Panier récupéré :', cart);

    // Vérification des items
    const cartItemIndex = cart.items.findIndex(
      (item) => item.id === Number(cartItemId),
    );

    if (cartItemIndex === -1) {
      console.log(`CartItem ID ${cartItemId} introuvable dans le panier`);
      throw new NotFoundException('Cart item not found');
    }

    const [cartItem] = cart.items.splice(cartItemIndex, 1);
    console.log('CartItem à supprimer :', cartItem);

    await this.cartItemRepository.remove(cartItem);
    console.log('CartItem supprimé de la base de données');

    const updatedCart = await this.cartRepository.save(cart);
    console.log('Panier mis à jour :', updatedCart);

    return updatedCart;
  }

  // Récupérer les items du panier
  async getCartItems(userId: number): Promise<CartItem[]> {
    const cart = await this.findOrCreateCart(userId);
    return cart.items; // Récupère directement les items associés au panier
  }

  async getCartSummary(userId: number): Promise<Cart> {
    return this.findOrCreateCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.findOrCreateCart(userId);
    await this.cartItemRepository.remove(cart.items);
    cart.items = [];
    await this.cartRepository.save(cart);
  }
}
