import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

// const defaultFileList: UploadFile[] = [
//     { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 33},
//     { uid: '132', size: 1234, name: 'xyz.md', status: 'success', percent: 33},
//     { uid: '144', size: 1234, name: 'eihghw.md', status: 'error', percent: 33}
// ]

const SimpleUpload = () => {
    return (
        <Upload
            action='https://www.mocky.io/v2/5185415ba171ea3a00704eed'
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onRemove={action('removed')}
            name='fileName'
            data={{'key': 'value'}}
            headers={{'X-Powered-By': 'cereal-ui'}}
            multiple={true}
        >
            <Button btnType='primary'>Upload File</Button>
        </Upload>
    )
}

const checkFileSize = (file:File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false;
    }
    return true;
}

// const filePromise = (file: File)  => {
//     const newFile = new File([file], 'new_name.zip', {type: file.type})
//     return Promise.resolve(newFile)
// }

const UploadCheckSize = () => {
    return (
        <Upload
            action='https://www.mocky.io/v2/5185415ba171ea3a00704eed'
            onChange={action('change')}
            beforeUpload={checkFileSize}
        >
            <Button btnType='primary'>Can't be Greater than 50KB</Button>
        </Upload>
    )
}

const uploadCheckSizeText = `
###### Before upload return boolean
File size can't be greater than 50K
How to set file size limit:
~~~javascript
const checkFileSize = (file:File) => {
    // Divide file size by 1024, so we can get file size in KB formate
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false;
        // if return false, upload component will not process anything
    }
    return true;
    // if return true, file will upload
}

// Promise way to handle before upload
const filePromise = (file: File)  => {
    const newFile = new File([file], 'new_name.zip', {type: file.type})
    return Promise.resolve(newFile)
}
~~~
`

const dragDropUpload = () => (
    <Upload
        action='https://www.mocky.io/v2/5185415ba171ea3a00704eed'
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
        onRemove={action('removed')}
        name='fileName'
        drag={true}
    >
        <Icon icon='upload' size='3x' theme='secondary' />
        <br/>
        <p>Drag file ove to upload</p>
    </Upload>
)


storiesOf('Upload', module)
    .add('Upload', SimpleUpload)
    .add('Check file size', UploadCheckSize, {info: { source: true, text: uploadCheckSizeText}})
    .add('Drag Upload', dragDropUpload)