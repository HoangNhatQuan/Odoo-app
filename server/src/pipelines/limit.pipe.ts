import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

export const MIN_LIMIT = 1
export const MAX_LIMIT = 100

@Injectable()
export class ParseLimitPipe implements PipeTransform {
  transform(value: string | number = MAX_LIMIT) {
    try {
      if (Number.isNaN(Number(value))) return 10
      const limit = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, Number(value)))
      return limit
    } catch (er) {
      throw new BadRequestException('Invalid limit value')
    }
  }
}
