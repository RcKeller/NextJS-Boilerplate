const axios = require('axios')
const { titleCase } = require('../../../tools/format')

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

  Params:
    page: Pagination page
    per_page: Results per page
  */
  async getEmployees (req, res) {
    try {
      // const { page, per_page } = req.params
      const { data } = await axios.get(`${this.base}`)
      const employees = Array.isArray(data)
        ? data.map(employee => this.transformFromEmployee(employee))
        : []
      res.status(200).json(employees)
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
      const employee = this.transformFromEmployee(data)
      res.status(200).json(employee)
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
      let body = this.transformToEmployee(req.body)
      delete body.id //  Prevents misuse
      console.log('POSTING:', body)
      const { data } = await axios.post(`${this.base}`, body)
      const employee = this.transformFromEmployee(data)
      res.status(200).json(employee)
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

  /*
  TRANSFORM API RESPONSES
  Expected data scheme (defined in types/employee.js)
  {
    "id": 0,
    "name": "string",
    "department": "string",
    "employee_annual_salary": 0,
    "job_titles": "string"
  }
  */
  // Transform from the API to client, coercing types
  transformFromEmployee ({ id, name, department, employee_annual_salary, job_titles }) {
    // API returns salary as a string. Coerce to float
    employee_annual_salary = Number.parseFloat(employee_annual_salary || 0)
    // job_titles is usually a string (misleading namespace), but we should support coercion anyways
    if (Array.isArray(job_titles)) job_titles = job_titles.join(', ')
    // Coerce the case of strings (all caps by default) to Title Case
    name = titleCase(name).replace(' ', ', ')
    department = titleCase(department)
    job_titles = titleCase(job_titles)
    return { id, name, department, employee_annual_salary, job_titles }
  }

  // Transform from the client to API, enforcing string structure
  transformToEmployee ({ id, name, department, employee_annual_salary, job_titles }) {
    // Coerce numeric values
    id = id ? Number.parseInt(id) : undefined
    employee_annual_salary = Number.parseFloat(employee_annual_salary || 0)
    // These are all uppercase on the API side
    name = name ? name.toUpperCase() : ''
    department = department ? department.toUpperCase() : ''
    job_titles = job_titles ? job_titles.toUpperCase() : ''
    return { id, name, department, employee_annual_salary, job_titles }
  }
}
