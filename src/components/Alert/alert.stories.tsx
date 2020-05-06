import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Alert, { AlertType } from './alert'

const basictAlert = () => (
    <Alert 
        alertType={AlertType.Default} 
        message="this is alert message"
        closable={true}
        onClose={action('Closed')}
    />
)

const differentTypesAlert = () => (
    <>
        <Alert 
            alertType={AlertType.White} 
            message="this is alert message"
            description='this is a description'
            closable={true}
            onClose={action('Closed')}
        />

        <Alert 
            alertType={AlertType.Black} 
            message="this is alert message"
            description='this is a description'
            closable={true}
            onClose={action('Closed')}
        />

        <Alert 
            alertType={AlertType.Success} 
            message="this is alert message"
            closable={true}
            onClose={action('Closed')}
        />

        <Alert 
            alertType={AlertType.Warning} 
            message="this is alert message"
            closable={true}
            onClose={action('Closed')}
        />

        <Alert 
            alertType={AlertType.Danger} 
            message="this is alert message"
            description='this is a description'
            closable={true}
            onClose={action('Closed')}
        />
    </>
)

const AlertWithDescription = () => (
    <Alert 
        alertType={AlertType.Warning} 
        message="this is alert message"
        description='This is a description long long long message'
        closable={true}
        onClose={action('Closed')}
    />
)


storiesOf('Alert Component', module)
    .add('Alert', basictAlert)
    .add('Different Types', differentTypesAlert)
    .add('With Description', AlertWithDescription)