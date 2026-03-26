const https = require('https');

function getJoke() {
    return new Promise((resolve, reject) => {
        https.get('https://v2.jokeapi.dev/joke/Any', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const joke = JSON.parse(data);
                    resolve(joke);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function displayJoke() {
    try {
        const joke = await getJoke();
        console.log('\n🎭 Random Joke Generator 🎭\n');
        if (joke.type === 'single') {
            console.log(joke.joke);
        } else if (joke.type === 'twopart') {
            console.log(joke.setup);
            setTimeout(() => {
                console.log('\n' + joke.delivery + '\n');
            }, 2000);
        }
        console.log(`Category: ${joke.category}`);
    } catch (error) {
        console.error('Error fetching joke:', error.message);
    }
}

displayJoke();