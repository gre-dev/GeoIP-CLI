<div align="center">
    <h1>GRE GeoIP CLI</h1>
    <p>The official CLI for GRE GeoIP API</p>
    <br />
    <a href="https://github.com/gre-dev/GeoIP-CLI/issues/new">Report Issue</a> · 
    <a href="https://github.com/gre-dev/GeoIP-CLI/discussions/new">Request Feature</a> · 
    <a href="https://www.gredev.io/en/GeoIP" target="_BLANK">API Home Page</a> · 
    <a href="https://geoip-docs.gredev.io/tools-and-libraries/geoip-cli" target="_BLANK">API Docs</a>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/ggip" title="NPM Package" href="_BLANK"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"></a>
    <a href="https://github.com/gre-dev/GeoIP-CLI" title="Github Repo" href="_BLANK"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
    <a href="https://www.patreon.com/gredev" title="Patreon Profile - GRE Development Ltd." href="_BLANK"><img src="https://img.shields.io/badge/Patreon-ff424e?style=for-the-badge&logo=patreon&logoColor=white"></a>
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" title="Javascript">
</div>
<br />

---
<br />

[![npm version](https://badge.fury.io/js/ggip.svg)](https://badge.fury.io/js/gre-geoip)
&nbsp;&nbsp;
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/gre-dev/GeoIP-CLI?color=green&label=Minified%20size&logo=github)
&nbsp;&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
&nbsp;&nbsp;
![API Status](https://img.shields.io/website?down_color=orange&down_message=down&label=API%20status&up_color=green&up_message=up&url=https%3A%2F%2Fgregeoip.com)
<br /><br />

# Installation
```
npm install --global ggip
```
<br />

# Usage
```
$ ggip -h

    The official CLI for GRE GeoIP API.

    ー Usage:
        geoip <command> [arguments] [options]

    ー Commands:
        me          Used to fetch your IP Address information.
        lookup      Retrieves the information of a specific IP Address.
        country     Retrieves the information of a specific Country.


    ー Options:
        -h          Show information about the current command.
        -v          Show the current CLI version.


    ー Tips:
        Each comand has specific optins. Please use
        '-h' after the command for more information

        Examples:
            geoip -h
            geoip me -h
            geoip country -h
            geoip lookup -h
```
<br /><br />

# Configuration
After installing the CLI, you need to set your API Key in order to use it's funcitonalities. This step can be done just by typeing the main CLI name in your terminal.

```
$ ggip

    The official CLI for GRE GeoIP API.

    ―   Hello 👋, it looks like this is the first time you use the tool.
        First of all,  you need to set your API Key.  If you don't have
        one yet, Please obtain a new one by creating a new  account  at:
        https://www.gredev.io/en/portal/register

        Note: This is a one-time step.

    Paste your API Key ⨠
```
Just paste your API Key and hit Enter.

> **_NOTE:_**  You can obtain an API Key just by creating an account at https://www.gredev.io/en/portal/register.

<br />


# Examples
```bash
$ ggip -h                           # Show usage information.
$ ggip me -h                        # Show usage information for `me` command.
$ ggip me                           # Used to get the current IP Address info.
$ ggip me -o JSON                   # Get the current IP Address in `JSON`
                                    # format.
$ ggip me -i                        # Get only the current IP Address.
$ ggip lookup 1.1.1.1               # Fetch the information of a specific IP
                                    # Address.
$ ggip lookup 1.1.1.1 -m timezone   # Fetch the information of a specific IP 
                                    # Address with the timezone information.
$ ggip country US                   # Fetch the information of a country code.
```

<br /><br />
# Credits
* [GRE Development Ltd.](https://www.gredev.io/en/)
* [All Contributors](https://github.com/gre-dev/GeoIP-CLI/graphs/contributors)

<br /><br />
# License
The MIT License (MIT). Please see [License](https://github.com/gre-dev/GeoIP-CLI/blob/main/LICENSE) File for more information.