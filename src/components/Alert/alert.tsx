import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../Button/button';

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger  = 'danger',
    Warning = 'warning'
}

export interface BaseAlertProps {
    className?: string;
    alertType: AlertType;
    message: string;
    description?: string;
    closable?: boolean;
    onClose?: () => void;
}


const Alert: React.FC<BaseAlertProps> = (props) => {
    const [show, setShow] = useState(true);

    const { className, alertType, message, description, closable, onClose } = props;

    const classes = classNames('alert', className, {
        [`alert-${alertType}`]: alertType,
        'closable': (closable === true) && closable
    })

    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
          onClose()
        }
        setShow(!show)
      }

    if(show) {
        return(
            <div
                className={classes}
                data-testid='alert'
            >
                <div>
                    {message}
                    { description && <div className='description'>{description}</div>}
                </div>
                { closable === true && 
                    <span
                        data-testid='close-btn'
                        className='close-btn'
                        onClick={handleClose}
                    >
                        x
                    </span>
                }
            </div>
        )
    }
    return(
        <Button onClick={handleClose}>Show Alert</Button>
    )
}


Alert.defaultProps = {
    closable: false,
    alertType:  AlertType.Default
}

export default Alert;