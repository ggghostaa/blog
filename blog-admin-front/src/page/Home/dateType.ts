export type userInfo = {
    name: string;
    role: string;
    avater: string;
    intro: string;
    webSite: string;
}

export interface PaginationInt {
    current: number;
    defaultCurrent: number;
    defaultPageSize: number;
    pageSize: number;
    total: number;
}

export class PaginationData implements PaginationInt {
    current: number;
    defaultCurrent: number;
    defaultPageSize: number;
    pageSize: number;
    total: number;

    constructor() {
        this.defaultCurrent = 1;
        this.current = 1;
        this.pageSize = 10;
        this.total = 0;
        this.defaultPageSize = 10;
    }
}