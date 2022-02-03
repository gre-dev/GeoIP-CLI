import React from 'react';
import { Text, Box } from 'ink';

const ResetHelp = () => {
    return (
        <>
            <Box><Text color="yellow">The official CLI for <Text bold>GRE GeoIP API</Text>.</Text></Box>
            <Text> </Text>
            <Box><Text color="yellow" bold>ー </Text><Text>Usage:</Text></Box>
            <Box>
                <Text>      ggip {`reset [options...]`}</Text>
            </Box>
            <Text> </Text>
            <Box><Text color="yellow" bold>ー </Text><Text>Information:</Text></Box>
            <Box><Text>      This command can be used to reset  your settings.</Text></Box>
            <Box><Text>      Please note that your API Key will be deleted and</Text></Box>
            <Box><Text>      you have to set it up again.</Text></Box>
            <Text> </Text>
            <Text> </Text>
        </>
    )
}

export default ResetHelp;