import React, {FC, useState, useEffect, useCallback} from 'react'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'
import {Button, Select, Space, Tag} from "antd";
import {DomEditor} from '@wangeditor/editor'
import { Article } from "./index";
import {CustomTagProps} from "rc-select/lib/BaseSelect";


const { Option } = Select;
const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];
const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    );
};

type category = {
    id: string;
    name: string
};

interface editorProps {
    submit: Function;
};

const MyEditor: FC<editorProps> = (props) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p>hello</p>') // 编辑器内容

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello&nbsp;world</p>')
        }, 1500)
    }, [])

    const article = new Article();
    const {submit} = props;
    const childSubmit = useCallback(() => {
        submit(html)
    }, [submit])

    const toolbar = DomEditor.getToolbar(editor!);

    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: [
            'headerSelect',
            'italic',
            'group-video'
        ]
    }


    //图片
    // 自定义校验链接
    function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
        if (!url) {
            return
        }
        if (url.indexOf('http') !== 0) {
            return '链接必须以 http/https 开头'
        }
        return true

        // 返回值有三种选择：
        // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
        // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
        // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    }

    // 自定义转换链接 url
    function customParseLinkUrl(url: string): string {
        if (url.indexOf('http') !== 0) {
            return `http://${url}`
        }
        return url
    }

    const editorConfig: Partial<IEditorConfig> = {
        MENU_CONF: {},
        placeholder: '请输入内容...',
    }
    //上传图片
    editorConfig.MENU_CONF!['uploadImage'] = {
        server: 'http://localhost:9099/api/upload',
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'your-custom-name',

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 10 * 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
            token: 'xxx',
            otherKey: 'yyy'
        },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        headers: {
            Accept: 'text/x-json',
            otherKey: 'xxx'
        },

        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 上传之前触发
        onBeforeUpload(file: File) {
            // file 选中的文件，格式如 { key: file }
            return file
            // 可以 return
                // 1. return file 或者 new 一个 file ，接下来将上传
            // 2. return false ，不上传这个 file
        },
        // 上传进度的回调函数
        onProgress(progress: number) {
            // progress 是 0-100 的数字
            console.log('progress', progress)
        },
        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
            console.log(`${file.name} 上传成功`, res)
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
            console.log(`${file.name} 上传失败`, res)
        },
        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
            console.log(`${file.name} 上传出错`, err, res)
        },

    };
    // 插入链接
    editorConfig.MENU_CONF!['insertLink'] = {
        checkLink: customCheckLinkFn, // 也支持 async 函数
        parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
    }
    // 更新链接
    editorConfig.MENU_CONF!['editLink'] = {
        checkLink: customCheckLinkFn, // 也支持 async 函数
        parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
    }


    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor]);
    //操作拦
    const categories: category[]  = [
        {
            id: '1',
            name: '1'
        }
    ];

    return (
        <>
            <div style={{background: '#eee',height: 50,padding:10}}>
               <Space>
                   <Select placeholder='分类' allowClear style={{ width: 120 }} onChange={(value: string)=>{
                       if (value !== undefined) {
                           article.categoryId = value;
                       }
                   }}>
                       {
                           categories.map((value,index)=> {
                               return(
                                   <Option value={value.id}>{value.name}</Option>
                               )
                           })
                       }
                   </Select>
                   <Select
                       mode="multiple"
                       showArrow
                       tagRender={tagRender}
                       defaultValue={['gold', 'cyan']}
                       style={{ width: '100%' }}
                       options={options}
                       placeholder='标签'
                   />
                   <Button onClick={()=>{
                       console.log(article)
                   }}>测试</Button>
                   <Button onClick={childSubmit}>保存为草稿</Button>
                   <Button onClick={childSubmit}>提交</Button>
               </Space>
            </div>
            <div style={{border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{height: '500px',}}
                />
            </div>
            <div style={{marginTop: '15px'}}>
                {html}
            </div>
        </>
    )
}
export default MyEditor;
