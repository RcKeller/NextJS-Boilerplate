import React from 'react'
import Theme from 'react-uwp/Theme'
/*
<UWPThemeProvider
  theme={getTheme({
    themeName: 'light',
    accent: '#F25022',
    useFluentDesign: true,
    desktopBackgroundImage: 'https://www.react-uwp.com/HEAD/static/images/jennifer-bailey-10753.1DE91.jpg' // set global desktop background image
  })}
>
*/
export class ThemeWrapper extends React.Component {
  render () {
    const { children, style, ...props } = this.props
    return (
      <Theme
        {...props}
        style={props && props.theme ? props.theme.prepareStyles(style) : void 0}
      >
        {children}
      </Theme>
    )
  }
}

export default ThemeWrapper
