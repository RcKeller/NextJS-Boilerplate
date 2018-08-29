import PropTypes from 'prop-types'
import Link from 'next/link'

import { ListItem } from 'react-md'
/*
NavItems - links in the sidebar, rendered in _app.js
This is abstracted out to reduce bundle sizes and test navigation behavior later
*/
const NavItem = (props) => (
  <Link href={props.href} as={props.as}>
    <ListItem
      primaryText={props.primaryText}
      secondaryText={props.secondaryText}
      leftAvatar={props.leftAvatar}
      rightIcon={props.rightIcon}
      threeLines={props.threeLines}
    />
  </Link>
)
NavItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  leftAvatar: PropTypes.element,
  rightIcon: PropTypes.element,
  threeLines: PropTypes.bool,
  href: PropTypes.string.isRequired,
  as: PropTypes.any
}
NavItem.defaultProps = {
  primaryText: 'Untitled',
  secondaryText: undefined,
  leftAvatar: undefined,
  rightIcon: undefined,
  threeLines: false,
  href: '/',
  as: undefined
}
export default NavItem
