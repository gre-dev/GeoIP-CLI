import React from 'react';
import { Text } from 'ink';

const MissingIPAddress = () => {
    return (
        <>
            <Text color="#FF0000">Error:</Text>
            <Text color="#FF0000">   You didn't specify the IP Address you want to lookup!</Text>
            <Text> </Text>
            <Text color="#C2B63F">Usage example:</Text>
            <Text color="#C2B63F">   geoip lookup <Text bold>{'<ip-address> [options...]'}</Text></Text>
        </>
    )
}

export default MissingIPAddress;