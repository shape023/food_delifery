import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3010',
});

//"start": "node ./backend/server.js",
//"start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"
