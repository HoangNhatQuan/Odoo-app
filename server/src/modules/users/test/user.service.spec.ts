import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserService } from '../services/user.service'
import { User } from '../entities/users.entity'

describe('UserService', () => {
  let service: UserService
  let userModel: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    userModel = module.get<Model<User>>(getModelToken(User.name))
  })

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const mockUser = { name: 'John Doe' }
      ;(userModel.findById as jest.Mock).mockResolvedValue(mockUser)

      const result = await service.getUserById('someId')
      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundException if user not found', async () => {
      ;(userModel.findById as jest.Mock).mockResolvedValue(null)

      await expect(service.getUserById('someId')).rejects.toThrow(
        NotFoundException,
      )
    })
  })
})
