import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';
import Spinner from 'ink-spinner';

const APP = () => {

	return <Text color="green"><Spinner type="earth" /> 1 tests passed</Text>;
};

render(<APP />);