import React from 'react';
import { Text } from 'ink';

const IPOnlyError = () => {
    return (
        <>
            <Text color="#FF0000">Error:</Text>
            <Text color="#FF0000">   Cannot use '-i' and '-m' in the same time!</Text>
            <Text> </Text>
            <Text color="#C2B63F">Tips:</Text>
            <Text color="#C2B63F">   Using <Text bold>'-i'</Text> means you want to return only</Text>
            <Text color="#C2B63F">   the IP Address. Whereas, using <Text bold>-m</Text> means</Text>
            <Text color="#C2B63F">   that you want to specify the modules you</Text>
            <Text color="#C2B63F">   want the CLI to return.</Text>
        </>
    )
}

export default IPOnlyError;