// // backend/monitor.js
// const axios = require('axios');
// const suspiciousDomains = require('./suspicious_domains.json');

// async function monitorDomain(domain) {
//     // First, check if the domain is in our suspicious list
//     if (suspiciousDomains.includes(domain.toLowerCase())) {
//         return true;
//     }

//     // Construct the API URL
//     const apiUrl = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
//     const apiKey = process.env.WHOIS_API_KEY;

//     try {
//         // Make the API request
//         const response = await axios.get(apiUrl, {
//             params: {
//                 apiKey: apiKey, // Your WhoisXML API key
//                 domainName: domain, // The domain name to check
//                 outputFormat: 'JSON' // Ensure the response is in JSON format
//             }
//         });

//         // Process the response to determine if the domain is suspicious
//         // Example condition: If the domain is available or meets certain criteria
//         if (response.data.DomainInfo.domainAvailability === 'AVAILABLE') {
//             return true;
//         }

//         return false;
//     } catch (error) {
//         console.error('Error checking domain with WhoisXML API:', error.message);
//         throw new Error('Unable to monitor domain.');
//     }
// }

// module.exports = { monitorDomain };
// backend/monitor.js
const axios = require('axios');
const suspiciousDomains = require('./suspicious_domains.json');

async function monitorDomain(domain) {
    // First, check if the domain is in our suspicious list
    if (suspiciousDomains.includes(domain.toLowerCase())) {
        return true;
    }

    // Construct the API URL
    const apiUrl = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
    const apiKey = process.env.WHOIS_API_KEY;

    try {
        // Make the API request
        const response = await axios.get(apiUrl, {
            params: {
                apiKey: apiKey, // Your WhoisXML API key
                domainName: domain, // The domain name to check
                outputFormat: 'JSON' // Ensure the response is in JSON format
            }
        });


        /* // Log the response to inspect its structure
        console.log('API Response:', response.data);

        // Process the response based on its actual structure
        if (response.data && response.data.DomainInfo && response.data.DomainInfo.domainAvailability === 'AVAILABLE') {
            return true;
        }

        return false; */

        return response.data
    } catch (error) {
        console.error('Error checking domain with WhoisXML API:', error.message);
        throw new Error('Unable to monitor domain.');
    }
}

module.exports = { monitorDomain };

