// const greet = (name) => {
//   return `hi i am ${name}`;
// };

// console.log(greet('gang'));

// console.log(global);

// const { people, ages } = require('./people');
// console.log(people, ages);

// const os = require('os');

// console.log(os.platform(), os.homedir());

const fs = require('fs');

// fs.readFile('./docs/login.txt', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// fs.writeFile('./docs/login.txt', 'Login Details here', () => {
//   console.log('File is wriiten');
// });

// fs.writeFile('./docs/hello.txt', 'Hello world', () => {
//   console.log('File was written again');
// });

// if (!fs.existsSync('./docs2')) {
//   fs.mkdir('./docs2', (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('folder created');
//   });
// } else {
//   fs.rmdir('./docs2', (error) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log('Folder deleted successfully');
//   });
// }

// if (fs.existsSync('./docs/delete.txt')) {
//   fs.unlink('./docs/delete.txt', (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('File deleted successfully.');
//   });
// }

// const readStream = fs.createReadStream('./docs/stream.txt', {
//   encoding: 'utf-8',
// });

// const writeStream = fs.createWriteStream('./docs/stream2.txt');

// readStream.on('data', (chunk) => {
//   console.log('------- New Chunk --------');
//   console.log(chunk);
//   writeStream.write('\n NEW CHUNK \n');
//   writeStream.write(chunk);
// });

// readStream.pipe(writeStream);

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set response header Type

  res.setHeader('Content-Type', 'text/html');
  // res.write('<p>Hello gangsters</p>');
  // res.end();

  //reading html files

  // implement basic routing here

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;

    default:
      path += '404.html';
      res.statusCode = 400;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening to server at 3000');
});
