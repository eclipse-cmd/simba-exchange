import React from 'react'

interface BarProps {
    duration: number
    progress: number
}

const Bar: React.FC<BarProps> = ({ duration, progress }) => {
    return (
        <div
            className="progress-bar"
            style={{
                marginLeft: `${(-1 + progress) * 100}%`,
                transition: `margin-left ${duration}ms linear`
            }}
        >
        </div>
    )
}

export default Bar