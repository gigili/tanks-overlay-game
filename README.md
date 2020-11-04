# Tanks overlay game

This is a simple 1 v 1 tank shooter game which is totally automated. It will pick random players from a streamer's chat.   

It will only pick viewers that have sent a message so that it does not expose people that are only lurking and maybe don't want to be seen.

# Thank you / Credits 
 * Big thank you to [Jay](https://github.com/justJay-dev) for creating bullet assets.

# Game setup

 * Clone the repo
 * `cd repo`
 * `npm install`
 * Update the `tmi.js` configs in the `utils/tmi.ts` file
 * `npm run dev`
 * Copy assets folder to the dist folder 
 * Open `http://localhost:5050` see the game running or add it as an OBS source
 
# TODOS:
   * [ ] Add a GIF of a sample gameplay
   * [ ] Create new design for leaderboard
   * [ ] Align player names and health info to be center with the tank asset
   * [ ] Adjust font sizes according to the available screen space
