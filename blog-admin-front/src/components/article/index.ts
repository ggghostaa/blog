export interface ArticleInt{
    id: string;
    userId: string;
    categoryId: string;
    articleCover: string;
    articleTitle: string;
    articleContent: string;
    createTime: string;
    updateTime: string;
    isTop: boolean;
    isDraft: boolean;
    isDelete: boolean;
    category: string;
    tag: string[];
    tagId: string[];
}

export class Article implements ArticleInt{
    id = '';
    userId = '';
    categoryId = '';
    articleCover = '';
    articleTitle = '';
    articleContent = '';
    createTime = '';
    updateTime = '';
    isTop = false;
    isDraft = false;
    isDelete = false;
    category = '';
    tag = [''];
    tagId = [''];
    constructor() {
    }
}
export interface tagInt{
    id: string;
    tagName: string;
    createTime: string;
    color: string;
}

export interface categoryInt{
    id: string;
    categoryName: string;
    createTime: string;
}