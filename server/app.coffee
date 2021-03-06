express = require 'express'
uglify = require 'uglify-js'
crush = require 'jscrush'
fs = require 'fs'
path = require 'path'

CODE_PATH = path.resolve(__dirname, '../submission.js')
PORT = process.env.PORT or 8000

getCode = (callback) ->
  fs.readFile CODE_PATH, 'utf8', (err, data) ->
    callback(data)

app = express()

app.set 'views', path.resolve(__dirname, 'views')
app.set 'view engine', 'ejs'

app.use express.favicon()

app.get '/dev', (req, res) ->
  getCode (code) ->
    res.render 'shim', { code }

app.get '/prod', (req, res) ->
  getCode (contents) ->
    try
      minified = uglify.minify contents, { fromString: yes }
      code = crush minified.code
      if minified.code.length < code.length
        code = minified.code
      console.log code.length + ' characters'
    catch
      code = "console.error('Error minifying code.');\n#{contents}"
    res.render 'shim', { code }

app.all '*', (req, res) ->
  res.set 'Content-Type', 'text/plain'
  res.send 'Visit /dev or /prod'

app.listen PORT, ->
  console.log 'App started on port ' + PORT
