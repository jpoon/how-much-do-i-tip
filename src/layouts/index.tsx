import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string
  }
  children: any
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  public render() {
    return (
      <div>
        <Helmet
          title="How Much Do I Tip?"
          meta={[
            { name: 'description', content: 'How Much Do I Tip' },
            { name: 'keywords', content: 'How Much Do I Tip' },
          ]}
        />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 900,
            padding: '0px 1.5rem',
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
