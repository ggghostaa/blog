import React, { FC, useState } from "react";
import { Tag, Button, Input,
    Space, Select, DatePicker, Table, Pagination,Switch  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";
import type { ColumnsType } from 'antd/lib/table';
import {Article, ArticleInt} from "./index";




const { Option } = Select;
const ArticleMgr:FC = () => {
    const article = new Article();
    article.articleTitle = '测试文章';
    article.id = 'hihi1'
    const [ searchValue, setSearchValue ] = useState('');
    const [ begTime, setBegTime ] = useState('');
    const [ endTime, setEndTime ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ isDraft, setIsDraft ] = useState(0);
    const [ isTop, setIsTop ] = useState(0);
    const [ isDelete, setIsDelete ] = useState(0);

    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(e)
        console.log('Clicked! But prevent default.');
    };
    const topChange = (checked: boolean, value: string) => {
        console.log(checked)
    }
    //列表
    interface ArticleType {
        id: string;
        articleTitle: string;
        articleCover: string;
        category: string;
        tags: string[];
        createTime: string;
        isTop: number;
        isDraft: number;
        isDelete: number;
    }

    const columns: ColumnsType<ArticleType> = [
        {
            title: '文章标题',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
            render: text => <a>{text}</a>,
        },
        {
            title: '文章封面',
            dataIndex: 'articleCover',
            key: 'articleCover',
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (value,record) => {
                return <>{moment(value).format('YYYY-MM-DD')}</>
            }
        },
        {
            title: '操作',
            key: 'id',
            render: (value: string, record) => (
                <Space size="middle">
                    <Switch onChange={(checked)=> {
                        topChange(checked,value)
                    }}></Switch>
                    <Button>编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    const data: ArticleType[] = [
        {
            id: '1',
            articleTitle: 'John Brown',
            articleCover: 'John Brown',
            category: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            createTime: '2012-05-06',
            isTop: 0,
            isDelete: 0,
            isDraft: 0
        }
    ];

    return (
        <div style={{margin: '0 0',height: '100%'}}>
            <div className="site-card-wrapper" style={{padding: '0'}}>
                <div className='screen' style={{height: 60,background: '#eee',width: '100%'}}>
                    <Space style={{margin: 15, position: 'relative', width: '100%'}}>
                        <Select style={{ width: 120 }} defaultValue='所有文章'
                                onChange={value => {
                                  if (value === "draft") {
                                      setIsDelete(0);
                                      setIsDraft(1);
                                  } else if (value === 'delete') {
                                      setIsDelete(1);
                                      setIsDraft(0);
                                    } else {
                                      setIsDraft(0);
                                      setIsDelete(0);
                                  }
                                }}>
                            <Option value="draft">草稿箱</Option>
                            <Option value="delete">回收箱</Option>
                        </Select>
                        <Select style={{ width: 120 }} placeholder='分类' allowClear
                        onChange={value => {
                            if (value === undefined) {
                                setCategory('');
                            } else {
                                setCategory(value);
                                console.log(value)
                            }
                        }}>
                            <Option value="jack">Jack</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        <DatePicker onChange={(value,dateString) => {
                            setBegTime(dateString);
                        }} placeholder='开始时间' />

                        <DatePicker  onChange={(value,dateString) => {
                            setEndTime(dateString);
                        }} placeholder='结束时间' />

                        <Input value={searchValue} onChange={e=>{
                            let searchValue = e.target.value;
                            setSearchValue(searchValue);
                        }}/>
                        <Button shape="circle" icon={<SearchOutlined />} />

                        <div style={{position: 'absolute',right: 30, top: 0}}>
                            <Pagination simple defaultCurrent={2} total={50} />
                        </div>
                    </Space>
                </div>
                <div>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
        </div>
    )

};

export default ArticleMgr;