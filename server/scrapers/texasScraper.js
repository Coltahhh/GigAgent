const axios = require('axios');
const cheerio = require('cheerio');
const Venue = require('../models/Venue');

async function scrapeTexasVenues() {
    try {
        const { data } = await axios.get('https://example-venues-site.com/texas');
        const $ = cheerio.load(data);

        const venues = [];

        $('.venue-card').each((i, element) => {
            const venue = {
                name: $(element).find('.name').text(),
                location: {
                    coordinates: [parseFloat($(element).data('lng')), parseFloat($(element).data('lat'))],
                    address: $(element).find('.address').text(),
                    city: $(element).find('.city').text(),
                    state: "TX"
                },
                capacity: parseInt($(element).find('.capacity').text()),
                genres: $(element).find('.genres').text().split(', '),
                amenities: $(element).find('.amenities').text().split(', ')
            };
            venues.push(venue);
        });

        await Venue.insertMany(venues);
        console.log(`Added ${venues.length} Texas venues`);
    } catch (err) {
        console.error('Scraping error:', err);
    }
}

// Run daily at 2AM
const CronJob = require('cron').CronJob;
new CronJob('0 2 * * *', scrapeTexasVenues).start();