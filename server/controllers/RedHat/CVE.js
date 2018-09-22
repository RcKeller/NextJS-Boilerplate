const axios = require('axios')

const RedHat = require('./RedHat')

module.exports = class CVE extends RedHat {
  constructor (router) {
    super(router)
    router.get('/cve', this.getCVEs)
    router.get('/cve/:id', this.getCVE)
  }
  /*
  http://localhost:3000/api/v1/cve/
  */
  async getCVEs (req, res) {
    try {
      const { data } = await axios
        .get(`${this.base}/cve.json`)
        .catch(Error)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  /*
  http://localhost:3000/api/v1/cve/CVE-2018-5736
  */
  async getCVE (req, res) {
    try {
      const { id } = req.params
      const { data } = await axios
        .get(`${this.base}/cve/${id}.json`)
        .catch(Error)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
