//  var url= "http://120.79.226.222"
var url = 'http://192.168.2.134:3001'

var config = {
  api: {
    question: '/question',
    login: '/login/v2',
    signup: '/v2/signup',
    answer: '/answer',
    sugPress: '/sugpress',
    mtech: '/mtech/auth',
    qrlog: '/mtech/qrlog'
  },
  key: '10320648-1fda4b61f6be628baac224e88'
}

for (var key in config.api) {
  config.api[key] = url + config.api[key]
}

module.exports = config
