export interface PagerViewModel {
    pageSize: number;
    start: number;
}
export class PagerResult<T>{
    public data: T[];
    public totalCount: number;
}
