import React from 'react'

interface ContainerProps {
    duration: number,
    isFinished: boolean
}

const Container: React.FC<ContainerProps> = ({ duration, isFinished, children }) => {
    return (
        <div style={{
            pointerEvents: 'none',
            opacity: isFinished ? 0 : 1,
            transition: `opacity ${duration}ms linear`
        }}>
            {children}
        </div>
    )
}


export default Container