import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Newline, useApp } from 'ink';
import { sendRequestToGRE, serialize } from '../funcitons';
import Spinner from 'ink-spinner';
import Link from 'ink-link';
import CountryHelp from '../components/country/CountryHelp';
import InvalidCodeView from '../components/country/InvalidCodeView';
import DevModeOnWarn from '../components/DevModeOnWarn';
import KeyView from '../components/KeyView';
const fs = require('fs');

/// Show the informatioin of a specified Country.

const country = ({countryHelp, countryCode, modules, development, format}) => {
    const [APIKey, setAPIKey] = React.useState('');
    const [isReady, setIsReady] = React.useState(false);
    const [isKeyChecked, setIsKeyChecked] = React.useState(false);
    const [APIKeyQuery, setAPIKeyQuery] = React.useState('');

	const [loading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState({});
	modules = (modules)?modules:'';
	countryCode = (countryCode)?countryCode:'';

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
			sendRequestToGRE('Country', serialize({
				CountryCode: countryCode,
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
			(countryHelp)?
				<CountryHelp />
			:(countryCode.length !== 2)?
				<InvalidCodeView />
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
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Code: {data.data.countryCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Name: {data.data.continentName}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Country Geo Name ID: {data.data.countryGeoNameID}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> capital: {data.data.capital}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Population: {data.data.population}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Phone Code: {data.data.phoneCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Continent Code: {data.data.continentCode}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Continent Geo Name ID: {data.data.continentGeoNameID}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Neighbours: {data.data.countryNeighbours}</Text>
									<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> isEU: {(data.data.countryIsEU)?'true':'false'}</Text>
									<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> TLD: {data.data.tld}</Text>
									<Text> </Text>
									{
										(modules.includes('language'))?
											<>
												<Text><Text color="yellow">┌</Text> Language Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Language Name: {data.data.language.name}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Language Code: {data.data.language.code}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> Language Native Name: {data.data.language.native}</Text>
												<Text> </Text>
											</>
										:
											<></>
									}
									{
										(modules.includes('flag'))?
											<>
												<Text><Text color="yellow">┌</Text> Flag Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Emoji: {data.data.flag.emoji}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Unicode: {data.data.flag.unicode}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> PNG Image: <Link url={data.data.flag.png['250px']}>{data.data.flag.png['250px']}</Link></Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> SVG Image: <Link url={data.data.flag.svg}>{data.data.flag.svg}</Link></Text>
												<Text> </Text>
											</>
										:
											<></>
									}
									{
										(modules.includes('currency'))?
											<>
												<Text><Text color="yellow">┌</Text> Currency Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Name: {(data.data.currency.currencyName)?'true':'false'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Code: {data.data.currency.currencyCode}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> Symbol: {data.data.currency.currencySymbol}</Text>
												<Text> </Text>
											</>
										:
											<></>
									}
									{
										(modules.includes('timezone'))?
											<>
												<Text><Text color="yellow">┌</Text> Currency Info:</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Name: {(data.data.timezone.name)?'true':'false'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Abbreviation: {data.data.timezone.abbreviation}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Offset: {data.data.timezone.offset}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Current Time: {data.data.timezone.currentTime}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Current Timestamp: {data.data.timezone.currentTimestamp}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> isDST: {(data.data.timezone.isDST)?'true':'false'}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Sunset: {data.data.timezone.sunInfo.sunset}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Sunrise: {data.data.timezone.sunInfo.sunrise}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Transit: {data.data.timezone.sunInfo.transit}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Civil Twilight Begin: {data.data.timezone.sunInfo.civilTwilightBegin}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Civil Twilight End: {data.data.timezone.sunInfo.civilTwilightEnd}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Nautical Twilight Begin: {data.data.timezone.sunInfo.nauticalTwilightBegin}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Nautical Twilight End: {data.data.timezone.sunInfo.nauticalTwilightEnd}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Astronomical Twilight Begin: {data.data.timezone.sunInfo.astronomicalTwilightBegin}</Text>
												<Text><Text color="yellow">│</Text>   <Text color="#3FC25A">⨠</Text> Astronomical Twilight End: {data.data.timezone.sunInfo.astronomicalTwilightEnd}</Text>
												<Text><Text color="yellow">└</Text>   <Text color="#3FC25A">⨠</Text> Day length: {data.data.timezone.sunInfo.dayLength}</Text>
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

country.propTypes = {
	countryHelp: PropTypes.bool,
	countryCode: PropTypes.string,
	modules: PropTypes.string,
	development: PropTypes.bool,
	format: PropTypes.string,
	version: PropTypes.bool,
};

country.shortFlags = {
	countryHelp: 'h',
	modules: 'm',
	development: 'd',
	format: 'o',
	version: 'v',
};

country.positionalArgs = ['countryCode'];

export default country;