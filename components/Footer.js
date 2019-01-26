import React from 'react'
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link'

const Footer = () => (
  <div className='footer-container'>
    {'Made with '}
    <span className='text-red'>♥</span>
    {' by '}
    <Link href='https://github.com/RcKeller/NextJS-Boilerplate'>Ryan Keller</Link>
  </div>
)

export default Footer
