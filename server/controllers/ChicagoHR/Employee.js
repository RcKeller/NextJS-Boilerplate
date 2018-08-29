const axios = require('axios')

const ChicagoHR = require('./ChicagoHR')

module.exports = class Employee extends ChicagoHR {
  constructor (router) {
    super(router)
    router.get('/employee', this.getEmployees)
    router.get('/employee/:id', this.getEmployee)
    router.post('/employee', this.createEmployee)
    // The following are not implemented and just return 501 w/ empty objects
    // Put-patch are mostly interchangable and everyone has a diff. opinion
    router.put('/employee', this.updateEmployee)
    router.patch('/employee', this.updateEmployee)
    router.delete('/employee', this.deleteEmployee)
  }
  /*
  GET ALL EMPLOYEES
  https://dt-interviews.appspot.com/docs#operation/listEmployees
  https://dt-interviews.appspot.com/
  */
  async getEmployees (req, res) {
    try {
      // const { page, per_page } = req.params
      const { data } = await axios.get(`${this.base}`)
      res.status(200).json(data)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }

  /*
  GET EMPLOYEE
  https://dt-interviews.appspot.com/docs#operation/getEmployeeById
  https://dt-interviews.appspot.com/<id>
  */
  async getEmployee (req, res) {
    try {
      const { id } = req.params
      const { data } = await axios.get(`${this.base}/${id}`)
      res.status(200).json(data)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }

  /*
  CREATE NEW EMPLOYEE
  https://dt-interviews.appspot.com/docs#operation/createEmployee
  https://dt-interviews.appspot.com/
  */
  async createEmployee (req, res) {
    try {
      const { data } = await axios.get(`${this.base}`, { data: req.body })
      res.status(200).json(data)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }

  /*
  UPDATE EMPLOYEE
  Not Implemented - Return 501
  */
  updateEmployee (req, res) {
    res.status(501).json({})
  }

  /*
  DELETE EMPLOYEE
  Not Implemented - Return 501
  */
  deleteEmployee (req, res) {
    res.status(501).json({})
  }
}
