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
    let color = this._generateColor()
    document.body.style.background = color
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          height: '80vh',
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
            padding: '10vh',
            border: '1px solid #000000',
            width: '50vw',
            height: '30vh',
            textAlign: 'center',
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
