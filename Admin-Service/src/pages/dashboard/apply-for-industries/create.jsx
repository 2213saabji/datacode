import React from 'react'
import { Helmet } from 'react-helmet-async'

import EmptyContent from 'src/components/empty-content';
import { CreateZohoForm } from '../../../sections/Apply-for-industries/view';

export default function create() {
  return (
    <>
    <Helmet>
        <title> Dashboard: Apply For Industries</title>
      </Helmet>

      {/* <EmptyContent
        filled
        title="Apply for Storage, Grading Unit, Processing Unit, Grinding Unit, Packaging Unit, ATTPL Stores and ATTPL Transportation at Panchayat level."
        title2='Opening Soon!'
        sx={{ py: 10 }}
      /> */}
      
      <CreateZohoForm />
    </>
  )
}
