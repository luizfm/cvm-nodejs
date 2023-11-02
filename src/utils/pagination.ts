export const PAGE_SIZE = 10

export const paginationSize = (page: number, pageSize: number) =>
  pageSize * page - pageSize
