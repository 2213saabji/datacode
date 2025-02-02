import React from 'react'
import { Helmet } from 'react-helmet-async'

import { ClientCreateView } from 'src/sections/clientCompanyLms/view'

export default function ChartedAccountantCreateView() {
  return (
    <>
    <Helmet>
        <title> Dashboard: Client Create</title>
      </Helmet>

      <ClientCreateView />
    </>
  )
}
