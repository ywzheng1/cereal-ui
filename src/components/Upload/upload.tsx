import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'

export interface UploadProps {
    /** Required, which endpoint you want the file send to*/
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload? : (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    /** Add custom HTTP header */
    headers?: {[key:string]: any};
    name?: string;
    /** Add custom formData */
    data?: {[key:string]: any};
    /** If file has cookie */
    withCredentials?: boolean;
    /** Accept file types */
    accept?: string;
    /** Set true to multiple selection at once */
    multiple?: boolean;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export const Upload:FC<UploadProps> = (props) => {

    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple
    } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFilelist ] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFilelist(prevList => {
            return prevList.map( file => {
                if(file.uid === updateFile.uid) {
                    return {...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }
    
    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files) {
            return
        }
        uploadFiles(files)
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const handleRemove = (file: UploadFile) => {
        setFilelist((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if(onRemove) {
            onRemove(file)
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if(!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(procssedFile => {
                        post(procssedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
            
        })
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFilelist(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if(data) {
            Object.keys(data).forEach(key=> {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading'})

                    if(onProgress) {
                        onProgress(percentage, _file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file, {status: 'success', response: resp.data})
            if(onSuccess) {
                onSuccess(resp.data, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        }).catch(err => {
            console.log(err)
            updateFileList(_file, { status: 'error', error: err})
            if(onError) {
                onError(err, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        })
    }

    return (
        <div 
            className='cereal-upload-component'
        >
            <Button 
                btnType='primary'
                onClick={handleClick}
            >
                Upload File
            </Button>
            <input
                className='cereal-file-input'
                style={{display: 'none'}}
                ref={fileInput}
                onChange={handleFileChange}
                type='file'
                accept={accept}
                multiple={multiple}
            />
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload;