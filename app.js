var Utils = require('./Utils');
var Processor = require('./Processor')
var Constants = require('./Constants')

console.log('start processing...')

Utils.initFolders()

// test parse map url
// var mapUrl = 'http://restapi.amap.com/v3/staticmap?location=119.077678,29.603685&zoom=12&size=700*200&markers=-1,http://www.wanzhoumo.com/assets/app/sign.png,A:119.077678,29.603685&key=48874191750929ccfd1c9802c2e56846'
// var url = Utils.parseMapUrl(mapUrl)
// console.log(url)

// test md5
// var md5 = Utils.md5(url)
// console.log(md5)

// test save image
// Utils.saveImages(url)
// Utils.saveImage(url, true)

// test save images
// Utils.saveImages([url])

// test save valid act list and details
// console.log(Constants.ACT_LIST_VALID)
Processor.requestListData(Constants.ACT_LIST_VALID)
Constants.ACT_DETAILS_ARRAY.forEach(function(item){
  Processor.requestDetailsData(item)
})

// test save invalid act list
// Processor.requestListData(Constants.ACT_LIST_INVALID)

// test save poi list and details
Processor.requestListData(Constants.POI_LIST)
Constants.POI_DETAILS_ARRAY.forEach(function(item){
  Processor.requestDetailsData(item)
})

// test save topic list
Processor.requestListData(Constants.TOPIC_LIST)

// test save feed list
Processor.requestListData(Constants.FEED_LIST)