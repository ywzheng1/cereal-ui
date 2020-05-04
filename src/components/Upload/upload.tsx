import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export interface UploadProps {
    /**Uploading URL */
    action: string;
    /** Use defaultFileList for uploaded files when page init */
    defaultFileList?: UploadFile[];
    /** Hook function which will be executed before uploading. Uploading will be stopped with false or a rejected Promise returned. */
    beforeUpload? : (file: File) => boolean | Promise<File>;
    /** During upload, set progress bar to true or false*/
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    /** A callback function, can be executed when uploading state is changing */
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    /** Add custom HTTP header */
    headers?: {[key:string]: any};
    name?: string;
    /** Add custom formData */
    data?: {[key:string]: any};
    /** ajax upload with cookie sent */
    withCredentials?: boolean;
    /** Accept file types */
    accept?: string;
    /** Set true to multiple selection at once */
    multiple?: boolean;
    /** If allow drag and drop file */
    drag?: boolean;
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

/**
 * ## Upload Component  
 * Upload file by selecting or dragging.
 * 
 * ## When To Use
 * - Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.
 * - When you need to upload one or more files.
 * - When you need to show the process of uploading.
 * - When you need to upload files by dragging and dropping.
 * 
 * ### How to import 
 * 
 * ~~~js
 * import { Upload } from 'cereal-ui'
 * ~~~
 * 
 */

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
        multiple,
        drag,
        children
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
                    _file.status = 'uploading'
                    _file.percent = percentage
                    if(onProgress) {
                        onProgress(percentage, _file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file, {status: 'success', response: resp.data})
            _file.status = 'success'
            _file.response = resp.data
            if(onSuccess) {
                onSuccess(resp.data, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        }).catch(err => {
            console.log(err)
            updateFileList(_file, { status: 'error', error: err})
            _file.status = 'error'
            _file.error = err
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
            <div
                className='cereal-upload-input'
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                { drag ? 
                    <Dragger onFile={(files) => {uploadFiles(files)}}>
                        {children}
                    </Dragger>
                    :
                    children
                }
                <input
                    className='cereal-file-input'
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type='file'
                    accept={accept}
                    multiple={multiple}
                />
            </div>
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