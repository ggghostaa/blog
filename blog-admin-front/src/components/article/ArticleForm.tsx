import React, { FC, useState, useRef, useCallback } from 'react';
import MyEditor from "./MyEditor";
import {Button, Space} from 'antd';
import {IDomEditor} from "@wangeditor/editor";
const ArticleForm: FC = (props) => {
    //提交表单
    const submit = useCallback((html: IDomEditor) => {
        console.log(html)
    },[])
    return (
        <div>
            <MyEditor submit={submit}/>
        </div>
    )
};

export default ArticleForm;