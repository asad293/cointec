import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => (
  <aside className="topics">
    <h6 className="heading-topics">LEARN TOPICS</h6>
    <ul>
      <li><NavLink to='/digital-currency-basics' activeClassName="active">Digital currency basics</NavLink></li>
      <li><NavLink to='/digital-wallets' activeClassName="active">Digital wallets</NavLink></li>
      <li><NavLink to='/blockchain' activeClassName="active">Blockchain</NavLink></li>
      <li><NavLink to='/glossary-of-terms' activeClassName="active">Glossary of terms</NavLink></li>
      <li><NavLink to='/glossary-of-tokens' activeClassName="active">Glossary of tokens</NavLink></li>
    </ul>
  </aside>
)

export default Sidebar
