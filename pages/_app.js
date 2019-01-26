import React from 'react'
import App, { Container } from 'next/app'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Router from 'next/router'
import NProgress from 'nprogress'

// import { NavBar, SidebarMenu, Footer } from 'components'
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme'
import NavigationView from 'react-uwp/NavigationView'
import SplitViewCommand from 'react-uwp/SplitViewCommand'

// DO NOT REMOVE - import root styles (done here to)
import 'styles/index.scss'

import {
  Button,
  ColorPicker,
  DatePicker,
  ProgressRing
} from 'react-uwp'

export default class AppWrapper extends App {
  // ENV: SSR
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    let userAgent = process.browser
      ? navigator.userAgent
      : ctx.req.headers['user-agent']
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps, userAgent }
  }

  static contextTypes = { theme: PropTypes.object }

  navigationTopNodes = [
    <SplitViewCommand label='Home' icon='Home' />,
    <SplitViewCommand label='CVE Dashboard' icon='PreviewLink' />
  ]

  navigationBottomNode = [
    <SplitViewCommand label='API Docs' icon={'Link'} />,
    <SplitViewCommand label='Source Code' icon={'Code'} />
  ]
  /*
  Page load - add NProgress bar
  Special thanks to this example:
  https: //phuongnq.me/2018-02-02-use-nprogress-with-nextjs/
  */
  componentWillMount () {
    if (Router && NProgress) {
      Router.onRouteChangeStart = () => NProgress.start()
      Router.onRouteChangeComplete = () => NProgress.done()
      Router.onRouteChangeError = () => NProgress.done()
    }
  }
  // navItems = [
  //   <NavItem
  //     key='index'
  //     href='/'
  //     as='/'
  //     primaryText='Home'
  //     rightIcon={<FontIcon>home</FontIcon>}
  //   />,
  //   <NavItem
  //     key='cve'
  //     href='/cve/dashboard'
  //     as='/cve/dashboard'
  //     primaryText='CVE Dashboard'
  //     rightIcon={<FontIcon>web</FontIcon>}
  //   />,
  //   <NavItem
  //     key='source'
  //     external
  //     href='//github.com/RcKeller/NextJS-Boilerplate'
  //     primaryText='Source Code'
  //     rightIcon={<FontIcon>code</FontIcon>}
  //   />,
  //   <NavItem
  //     key='docs'
  //     external
  //     href='//access.redhat.com/labs/securitydataapi/'
  //     primaryText='API Docs'
  //     rightIcon={<FontIcon>link</FontIcon>}
  //   />
  // ]
  render () {
    const { Component, pageProps, userAgent } = this.props
    return (
      <Container>
        <Helmet titleTemplate='%s - Vuln. Dashboard' />
        <UWPThemeProvider
          theme={getTheme({
            themeName: 'light',
            accent: '#F25022',
            useFluentDesign: true,
            desktopBackgroundImage: 'https://www.react-uwp.com/HEAD/static/images/jennifer-bailey-10753.1DE91.jpg' // set global desktop background image
          })}
        >
          <NavigationView
            style={{ width: '100%', height: '100vh' }}
            pageTitle='Vulnerability Dashboard'
            autoResize
            // expandedWidth={300}
            navigationTopNodes={this.navigationTopNodes}
            navigationBottomNodes={this.navigationBottomNode}
            focusNavigationNodeIndex={2}
          >
            <Component {...pageProps} />
            {/* <div>
              <Button>Test Button</Button>
              <DatePicker />
              <ColorPicker />
              <ProgressRing size={50} />
              <p style={{ textAlign: 'center' }}>{userAgent.slice(12)}...</p>
            </div> */}
          </NavigationView>
        </UWPThemeProvider>
      </Container>
    )
  }
}
