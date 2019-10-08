const ejs = require('ejs')
const fs = require('fs')
const yaml = require('js-yaml')
const program = require('commander')
const { exec } = require('child_process')

const defaultSource = './Content/content.yaml'

program
  .option('-m, --markup', 'compile markup only, no document')
  .option('-s, --source <content>', 'file to provide copy, defaults to content.yaml', defaultSource)
  .option('-o, --dont-open', 'open in browser')
  .parse(process.argv)

const output = program.args[0] ? `${program.args[0]}.html` : 'MTAFlyer.html'
const data = yaml.safeLoad(fs.readFileSync(program.source, 'utf8'))

const document = program.markup ? 'Poster.ejs' : 'Head.ejs'
const options = { rmWhitespace: true }

ejs.renderFile(`./Templates/${document}`, data, options, function(err, str) {
  if(err) {
    throw err}

  fs.writeFileSync(`./Build/${output}`, str)})

if(!program.dontOpen) {
  exec('open ' + `./Build/${output}`)}