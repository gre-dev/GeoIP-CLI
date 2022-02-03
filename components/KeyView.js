import React from 'react';
import { Text, Box } from 'ink';
import TextInput from 'ink-text-input';
import Link from 'ink-link';

const country = (props) => {
    return (
        <>
            <Box flexDirection="column">
                <Text><Text color="#C2B63F">―</Text>   <Text color="#3FC25A">Hello</Text> 👋, it looks like this is the first time you use the tool.</Text>
                <Text>    First of all,  <Text color="#3FC25A">you need to set your API Key</Text>.  If you don't have</Text>
                <Text>    one yet, Please obtain a new one by creating a new  account  at:</Text>
                <Text>    <Link url="https://www.gredev.io/en/portal/register">https://www.gredev.io/en/portal/register</Link></Text>
            </Box>
            <Text> </Text>
            <Box flexDirection="column">
                <Text>    <Text color="#C2B63F">Note:</Text> This is a one-time step.</Text>
            </Box>
            <Text> </Text>
            <Box>
                <Box marginRight={1}><Text>Paste your API Key <Text color="#3FC25A">⨠ </Text></Text></Box>
                <TextInput value={props.APIKeyQuery} onChange={props.setAPIKeyQuery} onSubmit={props.APIKeyUpdated} mask="ⵘ" />
            </Box>
        </>
    )
}

export default country;