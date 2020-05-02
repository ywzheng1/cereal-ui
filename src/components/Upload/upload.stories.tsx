import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

const SimpleUpload = () => {
    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts/'
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
        />
    )
}

const checkFileSize = (file:File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false;
    }
    return true;
}

const filePromise = (file: File)  => {
    const newFile = new File([file], 'new_name.zip', {type: file.type})
    return Promise.resolve(newFile)
}

const UploadCheckSize = () => {
    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts/'
            onChange={action('change')}
            beforeUpload={checkFileSize}
        />
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

storiesOf('Upload', module)
    .add('Upload', SimpleUpload)
    .add('Check file size', UploadCheckSize, {info: { source: true, text: uploadCheckSizeText}})