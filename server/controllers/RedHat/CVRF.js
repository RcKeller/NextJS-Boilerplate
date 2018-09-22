const axios = require('axios')

const RedHat = require('./RedHat')

module.exports = class CVRF extends RedHat {
  constructor (router) {
    super(router)
    router.get('/cvrf', this.getCVRFs)
    router.get('/cvrf/:id', this.getCVRF)
  }
  /*
  http://localhost:3000/api/v1/cvrf/
  */
  async getCVRFs (req, res) {
    try {
      const { data } = await axios
        .get(`${this.base}/cvrf.json`)
        .catch(Error)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  /*
  http://localhost:3000/api/v1/cvrf/
  */
  async getCVRF (req, res) {
    try {
      const { id } = req.params
      const { data } = await axios
        .get(`${this.base}/cvrf/${id}.json`)
        .catch(Error)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
