/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobCreateView() {
  const settings = useSettingsContext();

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const [open, setOpen] = useState(false);

  function onConfirm() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates(newPosition);
      });
      setOpen(false);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    onConfirm();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="ADD NEW JOB POST"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Job List',
            href: paths.dashboard.labour_job_portal.root,
          },
          {
            name: 'New Job Post',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm />
    </Container>
  );
}
