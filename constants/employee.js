import PropTypes from 'prop-types'

/*
Employee records:
Contains enums and a PropType for this data structure
*/
const enums = {}

const PropType = PropTypes.shape({
  department: PropTypes.string.isRequired,
  employee_annual_salary: PropTypes.number,
  job_titles: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
})

export default { enums, PropType }
