import React from 'react'
import App, { Container } from 'next/app'
import Helmet from 'react-helmet'
import Router from 'next/router'
import NProgress from 'nprogress'

import { FontIcon } from 'react-md'
import { NavItem, NavBar, SidebarMenu, Footer } from 'components'
import { Fabric } from 'office-ui-fabric-react/lib-commonjs/Fabric'

// DO NOT REMOVE - import root styles (done here to)
import 'styles/index.scss'

import PropTypes from 'prop-types'

import ThemeWrapper from '../components/ThemeWrapper'
import getTheme from 'react-uwp/styles/getTheme'

import {
  Button,
  ColorPicker,
  DatePicker,
  ProgressRing
} from 'react-uwp'

export default class AppWrapper extends App {
  // ENV: SSR
  static async getInitialProps ({ Component, router, ctx }) {
    console.log(ctx.req)
    let pageProps = {}
    let userAgent = process.browser
      ? navigator.userAgent
      : ctx.req.headers['user-agent']
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps, userAgent }
  }
  /*
  Page load - add NProgress bar
  Special thanks to this example:
  https: //phuongnq.me/2018-02-02-use-nprogress-with-nextjs/
  */
  componentWillMount () {
    console.log('CWM')
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
    const { Component, pageProps, userAgent } = this.props
    return (
      <Container>
        <Helmet titleTemplate='%s - Vuln. Dashboard' />
        <Fabric className='App'>
          <div className='header'>
            <NavBar />
          </div>
          <div className='body'>
            <div className='content'>
            <ThemeWrapper
              style={{
                padding: '20px 0',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
              theme={getTheme({ userAgent })}
            >
              <Button>Test Button</Button>
              <DatePicker />
              <ColorPicker />
              <ProgressRing size={50} />
              <p style={{ textAlign: 'center' }}>{userAgent.slice(12)}...</p>
            </ThemeWrapper>
              <Component {...pageProps} />
            </div>
            <div className='sidebar'>
              <SidebarMenu />
            </div>
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </Fabric>
      </Container>
    )
  }
}
