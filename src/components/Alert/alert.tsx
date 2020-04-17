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
}

interface BaseAlertButtonProps {
    children: React.ReactNode;
    className?: string;
}

type NativeButtonProps = BaseAlertButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseAlertButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type AlertCloseButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const AlertCloseButton: React.FC<AlertCloseButtonProps> = (props) => {

    const { children, className, ...restProps } = props

    return(
        <button
            data-testid='close-btn'
            className={className}
            {...restProps}
        >
            {children}
        </button>
    )
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
                data-testid='alert'
            >
                <div>
                    {message}
                    { description && <div className='description'>{description}</div>}
                </div>
                { closable === true && 
                    <AlertCloseButton
                        data-testid='close-btn'
                        className='close-btn'
                        onClick={() => setShow(false)}
                    >
                        x
                    </AlertCloseButton>
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