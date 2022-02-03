import React from 'react';
import { Text, Box, Newline } from 'ink';

const MeHelp = () => {
    return (
        <>
            <Box><Text color="yellow">The official CLI for <Text bold>GRE GeoIP API</Text>.</Text></Box>
            <Text> </Text>
            <Box><Text color="yellow" bold>ー </Text><Text>Usage:</Text></Box>
            <Box>
                <Text>      geoip {`me [options...]`}</Text>
            </Box>
            <Text> </Text>
            <Box><Text color="yellow" bold>ー </Text><Text>Options:</Text></Box>
            <Box><Text>      -i			Show only the IP Address</Text></Box>
            <Text> </Text>
            <Box><Text>      -o			Specifies the output format:</Text></Box>
            <Box><Text>        			(JSON or Newline).</Text></Box>
            <Text> </Text>
            <Box><Text>      -d			Enables the development environment,</Text></Box>
            <Box><Text>        			this can be used for testing only.</Text></Box>
            <Text> </Text>
            <Box><Text>      -m			The modules you want to return</Text></Box>
            <Box><Text>        			seperated by comma.</Text></Box>
            <Newline />
            <Box><Text color="yellow" bold>ー </Text><Text>Examples:</Text></Box>
            <Box><Text>      geoip me -i</Text></Box>
            <Box><Text>      geoip me -i -o JSON</Text></Box>
            <Box><Text>      geoip me -i -o JSON -d</Text></Box>
            <Box><Text>      geoip me -i -m location,timezone,security</Text></Box>
            <Text> </Text>
            <Text> </Text>
        </>
    )
}

export default MeHelp;