import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => (
  <aside className="topics">
    <h6 className="heading-topics">RELAVANT</h6>
    <ul>
      <li><NavLink to='/privacy' activeClassName="active">Privacy policy</NavLink></li>
      <li><NavLink to='/terms' activeClassName="active">Terms and conditions</NavLink></li>
      <li><NavLink to='/security' activeClassName="active">Security</NavLink></li>
    </ul>
  </aside>
)

export default Sidebar
