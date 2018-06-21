import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


export default class Icons extends Component {
  render() {
    return (
      <div>
        <FontAwesomeIcon icon="keyboard" size="5x" />
        <FontAwesomeIcon icon="tint" size="5x" />
        <FontAwesomeIcon icon="envelope" size="5x" />
      </div>
    )
  }
}
