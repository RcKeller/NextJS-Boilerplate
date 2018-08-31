import PropTypes from 'prop-types'

/*
Employee records:
Contains enums and a PropType for this data structure
*/
const enums = {}

const PropType = PropTypes.shape({
  department: PropTypes.string,
  employee_annual_salary: PropTypes.number,
  job_titles: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string
})

export default { enums, PropType }
