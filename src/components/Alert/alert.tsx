import React, { useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger  = 'danger',
    Warning = 'warning',
    White   = 'white',
    Black   = 'black'
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

    return(

        <Transition
            in={show}
            timeout={3000}
            animation='zoom-in-top'
        >
            <div className={classes} data-testid='alert'>
                <div>
                    {message}
                    { description && <div className='description'>{description}</div>}
                </div>
                { closable && 
                    <span data-testid='close-btn' className='close-btn' onClick={handleClose}>
                        <Icon icon='times'/>
                    </span>
                }
            </div>
        </Transition>
    )
}


Alert.defaultProps = {
    closable: true,
    alertType:  AlertType.Default
}

export default Alert;