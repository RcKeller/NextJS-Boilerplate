import React from 'react'
import PropTypes from 'prop-types'
import { EMPLOYEE } from 'types'

import { Grid, Cell, TextField, Button } from 'react-md'

/*
ProfileForm - Used to onboard or update employee profiles
*/
const ProfileForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <Grid>
      <Cell size={6} tabletSize={12} phoneSize={12}>
        <TextField
          id='name'
          name='name'
          type='text'
          defaultValue={props.employee.name}
          label='Name'
          helpText='Format: Doe, John C.'
          helpOnFocus
          required
        />
      </Cell>
      <Cell size={6} tabletSize={12} phoneSize={12}>
        <TextField
          id='job_titles'
          name='job_titles'
          type='text'
          defaultValue={props.employee.job_titles}
          label='Job Titles'
          helpText='Separate titles with commas'
          helpOnFocus
        />
      </Cell>
      <Cell size={6} tabletSize={12} phoneSize={12}>
        <TextField
          id='department'
          name='department'
          type='text'
          defaultValue={props.employee.department}
          label='Department'
        />
      </Cell>
      {props.includeSalary &&
        <Cell size={6} tabletSize={12} phoneSize={12}>
          <TextField
            id='employee_annual_salary'
            name='employee_annual_salary'
            type='number'
            defaultValue={props.employee.employee_annual_salary}
            min={0}
            label='Salary'
          />
        </Cell>
      }
      <Cell size={12}>
        <Button type='submit' className='full-width' flat primary iconChildren='send'>Submit</Button>
      </Cell>
    </Grid>
  </form>
)
ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  includeSalary: PropTypes.bool,
  employee: EMPLOYEE.PropType
}
ProfileForm.defaultProps = {
  onSubmit: () => undefined,
  includeSalary: false,
  employee: {
    id: undefined, //  Should be included via the onSubmit of the parent
    name: undefined,
    department: undefined,
    employee_annual_salary: 0,
    job_titles: undefined
  }
}

export default ProfileForm
