import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../Button/button';

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger  = 'danger',
    Warning = 'warning'
}

interface BaseAlertProps {
    className?: string;
    alertType?: AlertType;
    message: string;
    description?: string;
    closable?: boolean;
}


const Alert: React.FC<BaseAlertProps> = (props) => {
    const [show, setShow] = useState(true);

    const { className, alertType, message, description, closable } = props;

    const classes = classNames('alert', className, {
        [`alert-${alertType}`]: alertType,
        'closable': (closable === true) && closable
    })

    if(show) {
        return(
            <div
                className={classes}
            >
                <div>
                    {message}
                    { description && <div className='description'>{description}</div>}
                </div>
                { closable === true && 
                    <button 
                        className='close-btn'
                        onClick={() => setShow(false)}
                    >
                        X
                    </button>
                }
            </div>
        )
    }
    return(
        <Button onClick={() => setShow(true)}>Show Alert</Button>
    )
}


Alert.defaultProps = {
    closable: false,
    alertType:  AlertType.Default
}

export default Alert;