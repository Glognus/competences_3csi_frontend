/*globals COURSES:true */
import React from 'react'
import Dashboard from '../routes/Dashboard/components/Dashboard'
import Header from './Header'
import Sidebar from './Sidebar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        {this.props.children || <Dashboard />}
      </div>
    )
  }
}

module.exports = App