---
title: Building a Machine Learning framework from scratch
subtitle: Not the best, but my own!
tags:
  - Machine Learning
  - Neural Networks
  - Backpropagation
faIconPack: fas
faIcon: code
---

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```
