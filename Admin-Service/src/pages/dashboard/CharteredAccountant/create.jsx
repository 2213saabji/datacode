import React from 'react'
import { Helmet } from 'react-helmet-async'

import { ChartedAccountantCreateView } from 'src/sections/chartedAccountant/view'

export default function ChartedAccountantCreate() {
  return (
    <>
    <Helmet>
        <title> Dashboard: Charted Accountant Create</title>
      </Helmet>

      <ChartedAccountantCreateView />
    </>
  )
}
