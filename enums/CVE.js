import PropTypes from 'prop-types'

/*
CVE - Common Vulnerabilities and Exposures
NOTE: Wrap the proptype with PropTypes.shape() when in use!
We keep it in object form here for the purposes of testing
*/
export const PropType = {
  name: PropTypes.string,
  cwe: PropTypes.string,
  threat_severity: PropTypes.string,
  public_date: PropTypes.string, // "2017-09-14T00:00:00"
  statement: PropTypes.string,
  mitigation: PropTypes.string,
  upstream_fix: PropTypes.string,
  cvss3: PropTypes.shape({
    cvss3_base_score: PropTypes.string, //  Number
    cvss3_scoring_vector: PropTypes.string,
    status: PropTypes.string
  }),
  bugzilla: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string, //  Number
      description: PropTypes.string,
      url: PropTypes.string
    })
  ]),
  details: PropTypes.array,
  package_state: PropTypes.arrayOf(PropTypes.shape({
    product_name: PropTypes.string,
    fix_state: PropTypes.string,
    package_name: PropTypes.string,
    cpe: PropTypes.string
  }))
}

export default { PropType }
