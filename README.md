
# Tic-Tac-Toe

## Instruction

- This is a NextJS App router application. You can see the documentation here: https://nextjs.org/docs/app/getting-started.

- We do not care about authentication/security, though questions may be asked about how you'd plan to implement such things given more time allowance.

- Please create a fork of the repository and share it when you have completed. The test should take around 2 hours, please do not spend much longer than this. You are not being judged on a completed test but rather whatever you get done in the time.

- AI tools are welcome for assistance, but please do not "vibe code" the test, it will be very easy to tell if that is the case.



## Problems
### Problem 1
We want to make a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) ! 
- Please implement a complete basic game of Tic-Tac-Toe.
    HINT: Use a simple html grid where X and O for the game are just string values.
- Please use React and TypeScript throughout, if you know TailwindCSS, we have preconfigured it so you can use it as a bonus.
- Both players will play out of the same application, it is sufficient to just switch the state of the current player each time a move is played, assume that unless a game is over, at the end of a turn it will ALWAYS be the next players turn.
- Once a game is completed, I should be able to start another game.

### Problem 2
We are bored with the basic game now, can you make it so the board can be scaled to any size?
- Add some kind of input at the start of the game which allows me to change the board size.
- The board size should be a number between 3 and 15.

### Problem 3
We want to store information about who is winning each game and finish our leaderboard page.
- SQLITE3 (https://plainenglish.io/blog/using-sqlite-with-next-js-13) is pre-installed. Configure it, or another sql database, to save data about the leaderboard.
- Finish the started api/leaderboard endpoint, to send updates to the database.
HINT: Use an 'arcade' style leaderboard, where you enter a name at the end of the game and send the name to the endpoint.

### BONUS

Currently we are using REST endpoints to mutate our db - can you create a new page at "/server-leaderboard", where we use next server actions instead? (https://nextjs.org/docs/app/getting-started/updating-data).


## Quickstart
- Make sure you have **node** installed
- `npm i`
- `npm run dev`

Pages: "/" and "/leaderboard"

