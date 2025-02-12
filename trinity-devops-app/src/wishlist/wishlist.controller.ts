import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { CustomRequest } from '../interfaces/custom-request.interface';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  addToWishlist(
    @Req() req: CustomRequest,
    @Param('productId') productId: number,
  ) {
    const userId = req.user.id;
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Delete(':productId')
  removeFromWishlist(
    @Req() req: CustomRequest,
    @Param('productId') productId: number,
  ) {
    const userId = req.user.id;
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get()
  viewWishlist(@Req() req: CustomRequest) {
    const userId = req.user.id;
    return this.wishlistService.viewWishlist(userId);
  }
}
