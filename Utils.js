var fs = require('fs'), http = require('http'), crypto = require('crypto'), exec = require('child_process').exec

var IMG_FOLDER = 'images/'
var JSON_FOLDER = 'json/'
var HOST = 'http://cdn.wanzhoumo.com'

var initFolders = function() {
  exec('rm -rf ' + IMG_FOLDER)
  exec('rm -rf ' + JSON_FOLDER)
  exec('mkdir ' + IMG_FOLDER)
  exec('mkdir ' + JSON_FOLDER)
}

var parseMapUrl = function(originUrl) {
  return originUrl.replace(/size=\d+\*\d+/g, 'size=320*90') + '&scale=2'
}

var md5 = function(url) {
  return crypto.createHash('md5').update(url).digest('hex')
}

var parseFileName = function(url) {
  var result = url.split(HOST)
  if (result.length > 1) {
      var newName = result[1].replace(/\//g, '_')
      return newName
  }
}

// 保存一个数组的图片到本地
var saveImages = function(urls) {
  urls.forEach(function(url){
    saveImage(url)
  })
}

// 保存 url 对应的图片到本地，如果是地图的图片，则以 md5 为文件名
var saveImage = function(url, isMapImage) {
  var req = http.get(url, function(res) {
    var imgData = ''
    res.setEncoding('binary')

    res.on('data', function(chunk) {
        imgData += chunk
    })

    res.on('end', function() {
      var filename = ''
      if (isMapImage)
        filename = md5(url)
      else
        filename = parseFileName(url)
      fs.writeFile(IMG_FOLDER + filename, imgData, 'binary', function(err) {
          if (err) throw err
          console.log('File saved on path ' + filename)
      })
    })
  })

  req.on('error', function(err) {
      console.log(err)
  })
}

exports.initFolders = initFolders
exports.parseMapUrl = parseMapUrl
exports.md5 = md5
exports.parseFileName = parseFileName
exports.saveImages = saveImages
exports.saveImage = saveImage