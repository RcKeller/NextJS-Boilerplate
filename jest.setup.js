import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
/*
TEST ENV BOOTSTRAPPING
*/
configure({ adapter: new Adapter() })

// Disable console logging
Object.assign(console, {
  log: () => undefined,
  warn: () => undefined,
  error: () => undefined
})
