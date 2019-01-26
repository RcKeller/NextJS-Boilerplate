import React from 'react'
import T from 'prop-types'
import { SearchBox } from 'office-ui-fabric-react/lib-commonjs/SearchBox'
import './NavBar.scss'

const NavBar = ({onChange, onSearch}) => (
  <div className='NavBar'>
    <div className='logo ms-font-xl'>
      <strong>RedHat Vulnerability Dashboard</strong>
    </div>
    <div className='searchbox'>
      <SearchBox labelText='Search'
        onChange={(newValue) => console.log('SearchBox onChange fired: ' + newValue)}
        onSearch={(newValue) => console.log('SearchBox onSearch fired: ' + newValue)}
      />
    </div>
  </div>
)

NavBar.propTypes = {
  onChange: T.func,
  onSearch: T.func
}

NavBar.defaultProps = {
  onChange: (newValue) => console.log('SearchBox onChange fired: ' + newValue),
  onSearch: (newValue) => console.log('SearchBox onSearch fired: ' + newValue)
}

export default NavBar
