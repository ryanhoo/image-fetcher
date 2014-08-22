var fs = require('fs'),
    http = require('http'),
    Utils = require('./Utils');
var saveImage = Utils.saveImage,
    saveImages = Utils.saveImages,
    parseMapUrl = Utils.parseMapUrl;

var ACT = 'activity',
  POI = 'poi',
  TOPIC = 'topic',
  FEED = 'feedList';

var getType = function(url) {
  if (url.indexOf(POI) != -1)
    return POI
  else if (url.indexOf(ACT) != -1)
    return ACT
  else if (url.indexOf(TOPIC) != -1)
    return TOPIC
  else
    return FEED
}

var handlePOI = function(poi) {
  console.log('poi:')
  // 封面
  if (poi.pic_list_show[0]) {
    console.log('\t cover: ' + poi.pic_list_show[0])
    saveImage(poi.pic_list_show[0])
  }
  // 地图
  if (poi.mapurl) {
    console.log('\t mapurl: ' + poi.mapurl)
    saveImage(parseMapUrl(poi.mapurl), true)
  }
  // 缩略图
  if (poi.pic_list_thumb) {
    console.log('\t thumb: ' + poi.pic_list_thumb)
    saveImages(poi.pic_list_thumb)
  }
  // 详情图
  if (poi.pic_details_show) {
    console.log('\t details: ' + poi.pic_details_show)
    saveImages(poi.pic_details_show)
  }
}

var handleACT = function(act) {
  console.log('act:')
  // 活动图
  if (act.pic_list_show[0]) {
    console.log('\t pic: ' + act.pic_list_show[0])
    saveImage(act.pic_list_show[0])
  }
  // 地图
  if (act.mapurl) {
    console.log('\t mapurl: ' + act.mapurl)
    saveImage(parseMapUrl(act.mapurl), true)
  }
  // 详情图
  if (act.pic_details_show) {
    console.log('\t details: ' + act.pic_details_show)
    saveImages(act.pic_details_show)
  }
}

var handleTOPIC = function(topic) {
  console.log('topic:')
  // 封面
  if (topic.pic_show) {
    console.log('\t cover: ' + topic.pic_show)
    saveImage(topic.pic_show)
  }
}

var handleFEED = function(feed) {
  console.log('topic:')
  // 封面
  if (feed.target_pic) {
    console.log('\t cover: ' + feed.target_pic)
    saveImage(feed.target_pic)
  }
}

// activity or poi or topic list data
exports.requestListData = function(requestUrl) {
  var req = http.get(requestUrl, function(res) {
    res.setEncoding('utf8')

    var output = ''
    res.on('data', function(chunk) {
      output += chunk;
    })
    res.on('end', function() {
      var type = getType(requestUrl)
      console.log('request successfully' + output)
      var json = JSON.parse(output)
      if (json.result.list) {
        console.log(json)
        console.log('start processing result...')
        if (type === POI)
          json.result.list.forEach(handlePOI)

        if (type === ACT)
          json.result.list.forEach(handleACT)

        if (type === TOPIC)
          json.result.list.forEach(handleTOPIC)

        if (type === FEED)
          json.result.list.forEach(handleFEED)
      }
    })
  })

  req.on('error', function(err) {
    console.log(err)
  })
}

// activity or poi details data
exports.requestDetailsData = function(requestUrl) {
  var req = http.get(requestUrl, function(res) {
    res.setEncoding('utf8')

    var output = ''
    res.on('data', function(chunk) {
      output += chunk;
    })
    res.on('end', function() {
      var type = getType(requestUrl)
      console.log('request successfully ' + output + '-')
      var json = JSON.parse(output)
      if (json.result) {
        console.log(json)
        console.log('start processing result...')
        if (type === POI) {
          var poi = json.result
          handlePOI(poi)
        }

        if (type === ACT) {
          var act = json.result
          handleACT(act)
        }

        if (type === TOPIC) {
          var topic = json.result
          handleTOPIC(topic)
        }
      }
    })
  })

  req.on('error', function(err) {
    console.log(err)
  })
}