import React from 'react';
import { Text, Newline } from 'ink';

const DevModeOnWarn = () => {
    return (
        <>
            <Text color="#C2B63F">WARN: You are into a development environment. All data will be not real in this case. You can turn it off by removing the <Text bold>'-d'</Text> option.</Text>
            <Newline />
        </>
    )
}

export default DevModeOnWarn;