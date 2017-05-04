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

  addMessage = (message, person) => {
    console.log(message)
    db.ref('messages').push().set({ message, person: person })
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.textInput
    const person = this.refs.personName
    this.addMessage(input.value, person.value)
    input.value = ''
  }

  render () {
    return <div className='shoutbox' >
      <ul className='messages'>
        {_.map(this.state.messages, ({ person, message }, key) =>
          <li key={key}>
            <span>{person + ': '}{message}</span>
          </li>
        )}
      </ul>
      <form onSubmit={this._submit}>
        <div><input type='text' name='message' ref='personName' /> <label>Name</label> </div>
        <div><input type='text' name='message' ref='textInput' /> <button type='submit'>Send Message</button></div>
      </form>
    </div>
  }
}

export default App
