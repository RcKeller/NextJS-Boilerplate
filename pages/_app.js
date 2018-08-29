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
      key='Home'
      href='/'
      primaryText='Homepage'
      rightIcon={<FontIcon>home</FontIcon>}
    />,
    <NavItem
      key='Dashboard'
      href='/employee/dashboard'
      primaryText='Dashboard'
      rightIcon={<FontIcon>web</FontIcon>}
    />,
    <NavItem
      key='Onboarding'
      href='/employee/new'
      primaryText='Onboarding'
      rightIcon={<FontIcon>person_add</FontIcon>}
    />
  ]
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Helmet titleTemplate='%s - HR Dashboard' />
        <NavigationDrawer
          contentId='app'
          toolbarTitle='Chicago HR Dashboard'
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
