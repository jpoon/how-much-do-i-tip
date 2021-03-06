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

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, any> {
  constructor(props: DefaultLayoutProps) {
    super(props)
    this.state = { color: [50, 100, 150] }
  }

  componentDidMount() {
    document.body.style.background = this._generateColor()
  }

  _generateColor() {
    return (
      '#' +
      Math.random()
        .toString(16)
        .substr(-6)
    )
  }

  public render() {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          textAlign: 'center',
          height: '80vh',
          overflow: 'auto',
        }}
      >
        <Helmet
          title="How Much Do I Tip?"
          meta={[
            { name: 'description', content: 'How Much Do I Tip' },
            { name: 'keywords', content: 'How Much Do I Tip' },
          ]}
        />
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
            padding: '5vh',
            width: '50vw',
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
