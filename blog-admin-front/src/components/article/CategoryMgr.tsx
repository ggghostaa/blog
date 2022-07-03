import React, { FC, useState } from "react";
import {Button, Input, Pagination, Space, Table } from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type { ColumnsType } from 'antd/lib/table';
import { categoryInt } from "./index";
import moment from "moment";
import { PaginationData } from "../../page/Home/dateType";


const CategoryMgr:FC = () => {

    const [ searchValue, setSearchValue ] = useState<string>('');
    const pagination = new PaginationData();
    //表格
    const columns: ColumnsType<categoryInt> = [
        {
            title: '分类名',
            key: 'categoryName',
            dataIndex: 'categoryName',
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (_, { createTime}) => {
                return(
                    <>{moment(createTime).format('YYYY-MM-DD')}</>
                )
            }
        },
        {
            title: '操作',
            key: 'id',
            render: (_, { id }) => {
                return (
                    <Space>
                        <Button onClick={()=>{alert('编辑')}} type='primary'>编辑</Button>
                        <Button onClick={()=>{alert('删除')}} type='primary' danger>删除</Button>
                    </Space>
                )
            }
        }
    ];
    const data: categoryInt[] = [
        {
            id:'1',
            categoryName: '测试分类',
            createTime: '2022-05-03'
        }
    ]

    return (
        <div style={{margin: '0 0',height: '100%'}}>
            <div className="site-card-wrapper" style={{padding: '0'}}>
                <div className='screen' style={{height: 60,background: '#eee',width: '100%'}}>
                    <Space style={{margin: 15, position: 'relative', width: '100%'}}>
                        <Input value={searchValue} onChange={e=>{
                            let searchValue = e.target.value;
                            setSearchValue(searchValue);
                        }}/>
                        <Button shape="circle" icon={<SearchOutlined />} />
                        <Button onClick={()=> {alert('新增')}}>新增</Button>
                        <div style={{position: 'absolute',right: 30, top: 0}}>
                            <Pagination simple defaultCurrent={pagination.defaultCurrent} total={pagination.total}
                                        current={pagination.current} defaultPageSize={pagination.defaultPageSize}
                                        pageSize={pagination.defaultPageSize}/>
                        </div>
                    </Space>
                </div>
                <div>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
        </div>
    )
}

export default CategoryMgr;