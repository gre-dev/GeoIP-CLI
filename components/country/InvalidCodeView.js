import React from 'react';
import { Text } from 'ink';
import Link from 'ink-link';

const InvalidCodeView = () => {
    return (
        <>
            <Text color="#FF0000">Error:</Text>
            <Text color="#FF0000">   Invalid Country Code!</Text>
            <Text> </Text>
            <Text color="#C2B63F">Tip:</Text>
            <Text color="#C2B63F">   You should use the <Text bold underline>ISO 3166-1 alpha-2</Text> format of the country code (<Link url="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">Learn more</Link>).</Text>
            <Text> </Text>
            <Text color="#C2B63F">Usage:</Text>
            <Text color="#C2B63F">   geoip country <Text bold>{'<country-code> [options...]'}</Text></Text>
            <Text> </Text>
            <Text color="#C2B63F">Example:</Text>
            <Text color="#C2B63F">   geoip country <Text bold>{'US -o Newline'}</Text></Text>
        </>
    )
}

export default InvalidCodeView;