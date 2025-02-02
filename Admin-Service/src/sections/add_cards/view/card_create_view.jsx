import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CardsNewEditForm from '../card_new_edit_form';

// ----------------------------------------------------------------------

export default function CardCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW CARD"
        links={[
          // {
          //   name: 'Wardvol ',
          //   href: paths.dashboard.wardvol.root,
          // },
          { name: 'New Card ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <CardsNewEditForm />
    </Container>
  );
}
