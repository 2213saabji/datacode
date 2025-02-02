import React from 'react'
import { Helmet } from 'react-helmet-async'

import { ClientDetailsCreateView } from 'src/sections/clientDetailsLms/view'

export default function ChartedAccountantCreateView() {
  return (
    <>
    <Helmet>
        <title> Dashboard: Client Create</title>
      </Helmet>

      <ClientDetailsCreateView />
    </>
  )
}
