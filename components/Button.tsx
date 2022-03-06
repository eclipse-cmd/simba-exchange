import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
interface Props {
    type?: 'button' | 'submit',
    btn_text: string,
    isLoading?: boolean,
    size?: "small" | "large" | "medium";
    clickFunction?: () => void | undefined;
}

const ButtonLoader: React.FC<Props> = ({ type = 'submit', size = 'large', btn_text, isLoading, clickFunction = () => { } }) => {
    return (
        <Button onClick={() => clickFunction()} type={type} color="primary" size={size} variant="contained" className="btn btn-lg btn-primary btn-block btn-position-relative">
            <span className="text-capitalize">{btn_text}</span>
            {isLoading && <span className="btn-loader-icon loader-ring"><CircularProgress size={24} style={{ color: "#ffffff" }} /></span>}
        </Button>
    );
};

export default ButtonLoader;