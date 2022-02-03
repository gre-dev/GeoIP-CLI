import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Newline } from 'ink';
import { sendRequestToGRE, serialize } from '../funcitons';
import KeyView from '../components/KeyView';
import LookupHelp from '../components/lookup/LookupHelp';
import MissingIPAddress from '../components/lookup/MissingIPAddress';
import DevModeOnWarn from '../components/DevModeOnWarn';
import Spinner from 'ink-spinner';
const fs = require('fs');

/// Show the informatioin of your current IP Address.

const lookup = ({lookupHelp, ip, modules, development, format = 'Newline'}) => {
    const [APIKey, setAPIKey] = React.useState('');
    const [isReady, setIsReady] = React.useState(false);
    const [isKeyChecked, setIsKeyChecked] = React.useState(false);
    const [APIKeyQuery, setAPIKeyQuery] = React.useState('');

	const [loading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState({});
	modules = (modules)?modules:'';
	ip = (ip)?ip:'';

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


	React.useEffect(() => {
		if (APIKey.length > 0){
			setLoading(true);
			setIsError(false);
			sendRequestToGRE('IPLookup', serialize({
				ip: ip,
				key: APIKey,
				mode: development?'test':'live',
				params: modules,
				source: 'CLI'
			})).then(res => {
				if (res.data.status === 'success'){
					setData(res.data);
					setLoading(false);
				}else{
					setIsError(true);
					setLoading(false);
				}
			}).catch(() => {
				setIsError(true);
				setLoading(false);
			});
		}
	}, [APIKey]);

	return (
		(!isReady)?
			isKeyChecked?<KeyView APIKeyQuery={APIKeyQuery} setAPIKeyQuery={setAPIKeyQuery} APIKeyUpdated={APIKeyUpdated} />:<></>
		:(isKeyChecked)?
			(lookupHelp)?
				<LookupHelp />
			:(ip.length < 7)?
				<MissingIPAddress />
			:
				<>
					{
						development?<DevModeOnWarn />:<></>
					}
					{
						isError?
							<>
								<Text color="#FF0000">Error:</Text>
								<Text color="#FF0000">   An unknown error occurred while sending the request.</Text>
								<Text> </Text>
							</>
						:
							<></>
					}
					{
						loading?
							<Text><Spinner type="earth" />Fetching the data...</Text>
						:
							(format === 'Newline')?
								<>
									<Text> </Text>
									<Text><Text color="yellow">┌</Text> Basic Info:</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> IP: {data.data.ip}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> IP Number: {data.data.IPNumber}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Name: {data.data.continentName}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Code: {data.data.countryCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Geo Name ID: {data.data.countryGeoNameID}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Region Name: {data.data.regionName}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> City Name: {data.data.cityName}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Zip Code: {data.data.zipCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Continent Code: {data.data.continentCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Continent Geo Name ID: {data.data.continentGeoNameID}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Code: {data.data.countryCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Latitude: {data.data.latitude}</Text>
									<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> Longitude: {data.data.longitude}</Text>
									<Text> </Text>
									{
										(modules.includes('location'))?
											<>
												<Text><Text color="yellow">┌</Text> Location Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Capital: {data.data.location.capital}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Population: {data.data.location.population}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Language Name: {data.data.location.language.name}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Language Code: {data.data.location.language.code}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Language Native Name: {data.data.location.language.native}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Flag Emoji: {data.data.location.flag.emoji}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Flag Unicode: {data.data.location.flag.unicode}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Flag Image: <Link url={data.data.location.flag.png['250px']}>{data.data.location.flag.png['250px']}</Link></Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Phone Code: {data.data.location.phoneCode}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> countryIsEU: {(data.data.location.countryIsEU)?'true':'false'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Neighbours: {data.data.location.countryNeighbours}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> TLD: {data.data.location.tld}</Text>
												<Text> </Text>
											</>
										:
											<></>
									}
									{
										(modules.includes('timezone'))?
											<>
												<Text><Text color="yellow">┌</Text> Timezone Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Name: {data.data.timezone.name}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Abbreviation: {data.data.timezone.abbreviation}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Offset: {data.data.timezone.offset}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Current Time: {data.data.timezone.currentTime}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Current Timestamp: {data.data.timezone.currentTimestamp}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> isDST: {(data.data.timezone.isDST)?'true':'false'}</Text>
												<Text> </Text>
											</>
										:
											<></>
									}
									{
										(modules.includes('security'))?
											<>
												<Text><Text color="yellow">┌</Text> Security Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> isProxy: {(data.data.security.isProxy)?'true':'false'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Proxy Type: {(data.data.security.proxyType !== null)?data.data.security.proxyType:'null'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> isTor: {(data.data.security.isTor)?'true':'false'}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> isBot: {(data.data.security.isBot)?'true':'false'}</Text>
												<Text> </Text>
											</>
										:
											<></>
									}
								</>
							:
								<><Text>{JSON.stringify(data, null, 2)}</Text><Text> </Text></>
					}
				</>
		:
			<></>
	);

}

lookup.propTypes = {
	lookupHelp: PropTypes.bool,
	ip: PropTypes.string,
	modules: PropTypes.string,
	development: PropTypes.bool,
	format: PropTypes.string,
	version: PropTypes.bool,
};

lookup.shortFlags = {
	lookupHelp: 'h',
	modules: 'm',
	development: 'd',
	format: 'o',
	version: 'v',
};

lookup.positionalArgs = ['ip'];

export default lookup;