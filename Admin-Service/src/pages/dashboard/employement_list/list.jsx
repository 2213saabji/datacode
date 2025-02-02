import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EmployementListView } from 'src/sections/labourJobPortal/view';

export default function EmployementListPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Employeement List</title>
            </Helmet>

            <EmployementListView />
        </>
    );
}
