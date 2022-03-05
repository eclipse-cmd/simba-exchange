import React from 'react'
import { useNProgress } from "@tanem/react-nprogress"
import Bar from "./Bar"
import Container from "./Container"

interface ProgressProps {
    isAnimating: boolean
}

const Progress: React.FC<ProgressProps> = ({ isAnimating }) => {
    const { animationDuration, isFinished, progress } = useNProgress({isAnimating})

    return (
        <Container duration={animationDuration} isFinished={isFinished}>
            <Bar duration={animationDuration} progress={progress} />
        </Container>
    )
}

export default Progress