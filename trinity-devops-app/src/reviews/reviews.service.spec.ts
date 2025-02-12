import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let repository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findProductById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    repository = module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a review', async () => {
    const result = { id: 1, rating: 5, comment: 'Great product!' };
    jest.spyOn(repository, 'save').mockResolvedValue(result as any);

    expect(
      await service.addReview(1, 1, { rating: 5, comment: 'Great product!' }),
    ).toBe(result);
  });

  it('should update a review', async () => {
    const result = { id: 1, rating: 4, comment: 'Good product!' };
    jest.spyOn(repository, 'save').mockResolvedValue(result as any);

    expect(
      await service.updateReview(1, 1, { rating: 4, comment: 'Good product!' }),
    ).toBe(result);
  });

  it('should delete a review', async () => {
    jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

    expect(await service.deleteReview(1, 1)).toBeUndefined();
  });

  it('should get product reviews', async () => {
    const result = [{ id: 1, rating: 5, comment: 'Great product!' }];
    jest.spyOn(repository, 'find').mockResolvedValue(result as any);

    expect(await service.getProductReviews(1)).toBe(result);
  });
});
