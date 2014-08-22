var Utils = require('./Utils');
var Processor = require('./Processor')
var Constants = require('./Constants')

console.log('start processing...')

Utils.initFolders()

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

// test save topic list and details
Processor.requestListData(Constants.TOPIC_LIST)
Constants.TOPIC_DETAILS_ARRAY.forEach(function(item){
  Processor.requestDetailsData(item)
})

// test save feed list
Processor.requestListData(Constants.FEED_LIST)