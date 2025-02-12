import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

interface CustomRequest extends Request {
  user: { id: number };
}

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(
    @Req() req: CustomRequest,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    const userId = req.user.id;
    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Patch('update/:itemId')
  updateItem(
    @Req() req: CustomRequest,
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = req.user.id;
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  // @Delete('remove/:itemId')
  // removeItem(@Req() req: CustomRequest, @Param('itemId') itemId: number) {
  //   const userId = req.user.id;
  //   return this.cartService.removeItem(userId, itemId);
  // }
  @Delete('remove/:itemId')
  removeItem(@Req() req: CustomRequest, @Param('itemId') itemId: number) {
    console.log('Requête reçue pour supprimer un item :', itemId);
    const userId = req.user.id;
    console.log('Utilisateur ID :', userId);
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@Req() req: CustomRequest) {
    const userId = req.user.id;
    return this.cartService.getCartSummary(userId);
  }
  // Récupérer les items du panier
  @Get('items')
  async getCartItems(@Req() req: CustomRequest) {
    const userId = req.user.id;
    return this.cartService.getCartItems(userId); // Appelle la méthode pour récupérer les items
  }
  @Post('checkout')
  async checkout(@Req() req: CustomRequest) {
    const userId = req.user.id;
    await this.cartService.getCartSummary(userId);
    // Integrate the order placement and payment here
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}
