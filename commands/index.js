import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Newline } from 'ink';
import TextInput from 'ink-text-input';
import Link from 'ink-link';
const fs = require('fs');

/// The official CLI for GRE GeoIP API.
const Home = ({ inputArgs }) => {
    const [APIKey, setAPIKey] = React.useState('');
    const [isReady, setIsReady] = React.useState(false);
    const [isKeyChecked, setIsKeyChecked] = React.useState(false);
    const [APIKeyQuery, setAPIKeyQuery] = React.useState('');

    const APIKeyUpdated = () => {
        if (APIKeyQuery.length > 0){
            setAPIKey(APIKeyQuery);
            fs.appendFile('/tmp/.GREGeoIP_Cache', APIKeyQuery.toString(), function (err) {
                if (err) throw err;
            });
            setIsReady(true);
        }
    }

    React.useEffect(() => {
        setIsKeyChecked(false);
        try {
            if (fs.existsSync('/tmp/.GREGeoIP_Cache')) {
                fs.readFile('/tmp/.GREGeoIP_Cache', function(err, data) {
                    if (data.toString().length > 0){
                        setAPIKey(data.toString());
                        setIsReady(true);
                    }
                    setIsKeyChecked(true);
                });
            }else{
                fs.appendFile('/tmp/.GREGeoIP_Cache', '', function (err) {
                    setIsKeyChecked(true);
                    if (err) throw err;
                });
            }
        } catch (err) {
            setIsKeyChecked(true);
            console.error(err)
        }
    }, []);

    return (
        <>
            <Box>
                <Text color="#C2B63F">The official CLI for <Text bold>GRE GeoIP API</Text>.</Text>
            </Box>
            <Text> </Text>
            {
                isReady?
                    <>
                        <Box><Text color="yellow" bold>ー </Text><Text>Usage:</Text></Box>
                        <Box>
                            <Text>      ggip {`<command> [arguments] [options]`}</Text>
                        </Box>
                        <Text> </Text>
                        <Box><Text color="yellow" bold>ー </Text><Text>Commands:</Text></Box>
                        <Box><Text>     me          Used to fetch your IP Address information.</Text></Box>
                        <Box><Text>     lookup      Retrieves the information of a specific IP Address.</Text></Box>
                        <Box><Text>     country     Retrieves the information of a specific Country.</Text></Box>
                        <Box><Text>     reset       Used to reset the current settings.</Text></Box>
                        <Newline />
                        <Box><Text color="yellow" bold>ー </Text><Text>Options:</Text></Box>
                        <Box><Text>     -h          Show information about the current command.</Text></Box>
                        <Box><Text>     -v          Show the current CLI version.</Text></Box>
                        <Newline />
                        <Box><Text color="yellow" bold>ー </Text><Text>Tips:</Text></Box>
                        <Box><Text>     Each comand has specific optins. Please use</Text></Box>
                        <Box><Text>     '-h' after the command for more information</Text></Box>
                        <Text> </Text>
                        <Box><Text>     Examples:</Text></Box>
                        <Box><Text>         ggip -h</Text></Box>
                        <Box><Text>         ggip me -h</Text></Box>
                        <Box><Text>         ggip country -h</Text></Box>
                        <Box><Text>         ggip lookup -h</Text></Box>
                        <Text> </Text>
                        <Text> </Text>
                    </>
                :
                    isKeyChecked?
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

                                <TextInput value={APIKeyQuery} onChange={setAPIKeyQuery} onSubmit={APIKeyUpdated} mask="ⵘ" />
                            </Box>
                        </>
                    :
                    <></>
            }
        </>
    );
}

Home.propTypes = {
    /// Show the current version
    version: PropTypes.bool
};

Home.shortFlags = {
    version: 'v',
};

export default Home;