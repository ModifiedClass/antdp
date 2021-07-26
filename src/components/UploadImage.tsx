import {LoadingOutlined,PlusOutlined} from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload/interface'
import { message, Form, Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload/interface'
import {useState} from 'react'

import { resetImgUrl} from '@/utils/utils'

const UploadImage = (props: {coverImage:string,setCoverImage: Function}) => {
    // 图片地址 设置图片地址
    const { coverImage, setCoverImage } = props
    const [isLoading,setIsLoading] = useState(false)

    const beforeUpload = (file:RcFile) => {
        const isJpgOrPng = file.type=== 'image/jpeg' || file.type === 'image/png'
        if(!isJpgOrPng){
            message.error('只能上传jpg或png！')
        }
        const isLt2M =file.size / 1024 / 1024 < 2
        if(!isLt2M){
            message.error('图片必须小于2MB！')
        }
        return isJpgOrPng && isLt2M
    }
    const uploadButton=(
        <div>
            {isLoading ? <LoadingOutlined />:<PlusOutlined />}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    )
    
    const handleChange = (info:UploadChangeParam) => {
        if(info.file.status==='uploading'){
            setIsLoading(true)
            return
        }
        if(info.file.status==='done'){
            setCoverImage(info.file.response.fileName)
            setIsLoading(false)
        }
    }
    return (
        <Form.Item label="图片">
            <Upload name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action=""
              beforeUpload={beforeUpload}
              onChange={handleChange}>
                {coverImage?<img src={resetImgUrl(coverImage)} alt="pic" style={{width:'100%'}}/>:uploadButton}
            </Upload>
            
        </Form.Item>
    )
}

export default UploadImage