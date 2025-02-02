import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetModelbyID } from 'src/api/model';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ModelNewEditForm from '../model-new-edit-form';

// ----------------------------------------------------------------------

export default function ModelEditView({ id }) {
  const settings = useSettingsContext();

  const { models: currentModel } = useGetModelbyID(id);
  //  console.log(currentModel)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT MODAL DETAILS"
        links={[
          {
            name: ' Our Modal ',
            href: paths.dashboard.model.root,
          },
          { name: currentModel?.data.expenseWorkId },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ModelNewEditForm currentModel={currentModel} />
    </Container>
  );
}

ModelEditView.propTypes = {
  id: PropTypes.string,
};
