const fs = require('fs');
const axios = require('axios');
const prompt = require('prompt');
const apiUrl = 'https://icanhazdadjoke.com/search';

function dadJoke(searchTerm) {
    axios.get(apiUrl, {
      params: {
        term: searchTerm,
      },
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      const data = response.data;
      if (data.results.length > 0) {
        const randomJoke1 = data.results[Math.floor(Math.random() * data.results.length)].joke;
        const randomJoke2 = data.results[Math.floor(Math.random() * data.results.length)].joke;
        console.log(`Here is a ${searchTerm} dad joke for you:`);
        console.log(randomJoke1);
        console.log(randomJoke2);
  
        // Save the joke to jokes.txt
        fs.appendFile('jokes.txt', randomJoke1 + '\n' + randomJoke2 + '\n', (err) => {
          if (err) throw err;
          // console.log('Joke saved to jokes.txt');
        });
      } else {
        console.log('No jokes found for that search term.');
      }
    })
    .catch(error => {
      console.error('Error fetching jokes:', error);
    });
}

prompt.start();
console.log('Welcome to the DAD JOKES APP!!\nGet yourself some cool Dad Jokes to laugh and forget your sorrows!!!');
console.log("\nPlease enter Your name below...");
prompt.get(['name'], (err, result) => {
  if (err) throw err;
  console.log(`Welcome, ${result.name}! to DAD JOKES APP!`);

  // Proceed to ask for the search term.
  console.log("\nPlease enter a keyword for the jokes you'll like below...");
  prompt.get(['searchTerm'], (err, result) => {
    if (err) throw err;
    dadJoke(result.searchTerm);
  });
});

if (process.argv[2] === 'leaderboard') {
    fs.readFile('jokes.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const jokes = data.split('\n').filter(joke => joke.trim() !== ''); // splits the contents to an array
      const jokeCounts = {};
  
      jokes.forEach(joke => {
        if (jokeCounts[joke]) {
          jokeCounts[joke]++;
        } else {
          jokeCounts[joke] = 1;
        }
      });
  
      const mostPopularJoke = Object.keys(jokeCounts).reduce((a, b) => jokeCounts[a] > jokeCounts[b] ? a : b);
      console.log('The most popular joke is:');
      console.log(mostPopularJoke);
    });
} 
// else if (searchTerm == 'leaderboard') {
//     fs.readFile('jokes.txt', 'utf8', (err, data) => {
//         if (err) throw err;
//         const jokes = data.split('\n').filter(joke => joke.trim() !== '');
//         const jokeCounts = {};
    
//         jokes.forEach(joke => {
//           if (jokeCounts[joke]) {
//             jokeCounts[joke]++;
//           } else {
//             jokeCounts[joke] = 1;
//           }
//         });
    
//         const mostPopularJoke = Object.keys(jokeCounts).reduce((a, b) => jokeCounts[a] > jokeCounts[b] ? a : b);
//         console.log('The most popular joke is:');
//         console.log(mostPopularJoke);
//       });
// }
  