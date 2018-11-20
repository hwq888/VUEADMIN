import https from '@/libs/https.js'
export default {
  getTable: function (params) {
    return https.get('/caseView', params)
  }
}
