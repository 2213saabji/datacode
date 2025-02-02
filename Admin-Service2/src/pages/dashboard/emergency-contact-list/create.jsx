import React from 'react'
import { Helmet } from 'react-helmet-async'

import EmptyContent from 'src/components/empty-content';

export default function create() {
  return (
    <>
    <Helmet>
        <title> Dashboard: Apply For Industries</title>
      </Helmet>

      <EmptyContent
        filled
        title="Emergency contact list will be available soon."
        title2='Coming Soon!'
        sx={{ py: 10 }}
      />
    </>
  )
}
