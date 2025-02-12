import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            addReview: jest.fn(),
            updateReview: jest.fn(),
            deleteReview: jest.fn(),
            getProductReviews: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a review', async () => {
    const result = { id: 1, rating: 5, comment: 'Great product!' };
    jest.spyOn(service, 'addReview').mockResolvedValue(result as any);

    expect(
      await controller.addReview({ user: { id: 1 } } as any, 1, {
        rating: 5,
        comment: 'Great product!',
      }),
    ).toBe(result);
  });

  it('should update a review', async () => {
    const result = { id: 1, rating: 4, comment: 'Good product!' };
    jest.spyOn(service, 'updateReview').mockResolvedValue(result as any);

    expect(
      await controller.updateReview({ user: { id: 1 } } as any, 1, {
        rating: 4,
        comment: 'Good product!',
      }),
    ).toBe(result);
  });

  it('should delete a review', async () => {
    jest.spyOn(service, 'deleteReview').mockResolvedValue(undefined);

    expect(
      await controller.deleteReview({ user: { id: 1 } } as any, 1),
    ).toBeUndefined();
  });

  it('should get product reviews', async () => {
    const result = [{ id: 1, rating: 5, comment: 'Great product!' }];
    jest.spyOn(service, 'getProductReviews').mockResolvedValue(result as any);

    expect(await controller.getProductReviews(1)).toBe(result);
  });
});
