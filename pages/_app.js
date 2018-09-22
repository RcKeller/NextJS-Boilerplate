import React from 'react'
import App, { Container } from 'next/app'
import Helmet from 'react-helmet'
import Router from 'next/router'
import NProgress from 'nprogress'

import { NavigationDrawer, FontIcon } from 'react-md'
import { NavItem } from 'components'

// DO NOT REMOVE - import root styles (done here to)
import 'styles/index.scss'

export default class AppWrapper extends App {
  // ENV: SSR
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
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
  navItems = [
    <NavItem
      key='index'
      href='/'
      as='/'
      primaryText='Home'
      rightIcon={<FontIcon>home</FontIcon>}
    />,
    <NavItem
      key='cve'
      href='/cve/dashboard'
      as='/cve/dashboard'
      primaryText='CVE Dashboard'
      rightIcon={<FontIcon>web</FontIcon>}
    />,
    <NavItem
      key='source'
      external
      href='//github.com/RcKeller/NextJS-Boilerplate'
      primaryText='Source Code'
      rightIcon={<FontIcon>code</FontIcon>}
    />,
    <NavItem
      key='docs'
      external
      href='//access.redhat.com/labs/securitydataapi/'
      primaryText='API Docs'
      rightIcon={<FontIcon>link</FontIcon>}
    />
  ]
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Helmet titleTemplate='%s - Vuln. Dashboard' />
        <NavigationDrawer
          contentId='app'
          toolbarTitle='RedHat Vulnerability Dashboard'
          drawerTitle='Navigation'
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          desktopDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          navItems={this.navItems}
        >
          <Component {...pageProps} />
        </NavigationDrawer>
      </Container>
    )
  }
}
