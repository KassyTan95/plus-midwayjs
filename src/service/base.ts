import { Provide } from '@midwayjs/core'
import { SelectQueryBuilder } from 'typeorm'
import { createPaginationObject, IPaginationOptions } from '../interface'

@Provide()
export abstract class BaseService {
  /**
   * 分页
   * @param queryBuilder
   * @param options
   */
  async paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions) {
    const { page, limit } = options

    queryBuilder.take(limit).skip((page - 1) * limit)

    const [items, total] = await queryBuilder.getManyAndCount()

    return {
      total,
      pageSize: limit,
      currentPage: page,
      data: items
    } as createPaginationObject<T>
  }
}
