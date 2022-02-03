import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Newline } from 'ink';
import TextInput from 'ink-text-input';
import ResetHelp from '../components/reset/ResetHelp';
const fs = require('fs');

const reset = ({resetHelp}) => {
    const [done, setDone] = useState(false);
    const [query, setQuery] = useState('');

    const answered = () => {
        if (query.toLowerCase() === 'yes' || query.length < 1){
            resetHandler();
            console.log('Done!');
        }else{
            console.log('Cancelled!');
        }
        setDone(true);
    }
    
    const resetHandler = () => {
        if (fs.existsSync('/tmp/.GREGeoIP_Cache')) {
                fs.unlink('/tmp/.GREGeoIP_Cache',function (err) {
                if (err) throw err;
            });
        }
    }

    return (
        (resetHelp)?
            <ResetHelp />
        :
            (!done)?
                <Box>
                    <Box marginRight={1}><Text color="redBright">Are you sure to reset your settings? (<Text bold>Yes</Text>/no) <Text color="#3FC25A">⨠ </Text></Text></Box>
                    <TextInput value={query} onChange={setQuery} onSubmit={answered} />
                </Box>
            :
                <></>
    );
}

reset.propTypes = {
	resetHelp: PropTypes.bool,
	version: PropTypes.bool,
};

reset.shortFlags = {
	resetHelp: 'h',
	version: 'v',
};

export default reset;