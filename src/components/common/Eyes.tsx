import React from 'react';
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

interface EyesIconProps {
    width?: number;
    height?: number;
    animated?: boolean;
}

const Eyes: React.FC<EyesIconProps> = ({width = 30, height = 30, animated = true}) => {
    return (
        <div style={{width: width, height: height}}>
            <DotLottieReact
                src="https://assets-v2.lottiefiles.com/a/c309332e-1167-11ee-bf04-6f799f1ab558/RkP0mjBFUq.lottie"
                loop={animated}
                autoplay={animated}
            />
        </div>
    )
};

export default Eyes;
