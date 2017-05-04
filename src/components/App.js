import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import db from '../db'

window.db = db

class App extends Component {
  state = {
    messages: {}
  }

  componentDidMount () {
    db.ref('messages').on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({
        messages: snapshot.val()
      })
    })
  }

  addMessage = (message) => {
    db.ref('messages').push().set({ message, person: 'turtle' })
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.textInput
    console.log(input.value)
    this.addMessage(input.value)
    input.value = ''
  }

  render () {
    return <div className='hello' >
      <main>
        <textarea name='textarea' rows='10' cols='50' className='' />
        <form onSubmit={this._submit} >
          <input type='text' ref='textInput' />
          <input type='text' ref='personName' />
        </form>
      </main>
    </div>
  }
}

export default App
