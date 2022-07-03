import React, { FC, useState, useRef } from "react";
import { Button, Input, Pagination, Space, Table, Tag, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from 'antd/lib/table';
import { tagInt } from "./index";
import moment from "moment";
import { PaginationData } from "../../page/Home/dateType";


const TagMgr:FC = () => {

    const [ searchValue, setSearchValue ] = useState<string>('');
    const pagination = new PaginationData();
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ title, seTitle ] = useState("新增标签");
    const tagForm = useRef<tagInt>(null);

    const showModal = (e: string,record?: tagInt) => {
        setIsModalVisible(true);
        seTitle(e)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //表格
    const columns: ColumnsType<tagInt> = [
        {
            title: '标签名',
            key: 'tagName',
            dataIndex: 'tagName',
        },
        {
            title: '标签类型',
            key: 'color',
            dataIndex: 'color',
            render: (_, { color, tagName }) => {
                return (
                    <Tag color={color}> {tagName}</Tag>
                )
            }
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
            render: (_, record) => {
                return (
                    <Space>
                        <Button onClick={()=>{showModal('编辑标签',record)}} type='primary'>编辑</Button>
                        <Button onClick={()=>{alert('删除')}} type='primary' danger>删除</Button>
                    </Space>
                )
            }
        }
    ];
    const data: tagInt[] = [
        {
            id:'1',
            tagName: '11',
            color: '#f50',
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
                        <Button onClick={()=> {showModal('新建标签')}}>新增</Button>
                        <Button onClick={()=> {
                            console.log(tagForm)}}>新增</Button>
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
            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

        </div>
    )
}

export default TagMgr;