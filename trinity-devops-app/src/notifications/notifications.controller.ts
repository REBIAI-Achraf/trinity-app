import { Controller, Post, Get, Patch, Param, Req, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  createNotification(
    @Req() req: CustomRequest,
    @Body('message') message: string,
  ) {
    const userId = parseInt(req.user.id, 10);
    return this.notificationsService.createNotification(userId, message);
  }

  @Get()
  getNotifications(@Req() req: CustomRequest) {
    const userId = parseInt(req.user.id, 10);
    return this.notificationsService.getNotifications(userId);
  }

  @Patch(':notificationId')
  markAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
