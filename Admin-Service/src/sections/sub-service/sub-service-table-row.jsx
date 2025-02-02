import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

// import { fCurrency } from 'src/utils/format-number';
// import { fTime, fDate } from 'src/utils/format-time';


import { useGetServices } from 'src/api/service';


// ----------------------------------------------------------------------

export function RenderCellPrice({ params }) {
  return (
    <>
      {' '}
      <ListItemText
        disableTypography
        primary={
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={params.row.onViewRow}
            sx={{ cursor: 'pointer' }}
          >
            {params.row.registrationNumber}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellPrice.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// function for stars

export function RenderCellPublish({ params }) {
  const { services: serviceList } = useGetServices();
  const ServiceListArr = serviceList?.data || [];
  const ServiceData = ServiceListArr.map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));
  console.log('service.......', params, ServiceData);
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {/* {params.row.serviceId} */}
          {ServiceData.find((option) => option.value === params.row.serviceId)?.label ||
            'Service Not Found'}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

// getOptionLabel={(value) => {
//   const service = ServiceData.find((option) => option.value === value);
//   return service ? service.label : '';
// }}

RenderCellPublish.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCreatedAt({ params }) {
  console.log('params................', params);
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.issueType}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCreatedAt.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellStock({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params.row.issueDescription}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellStock.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellProduct({ params }) {
  return (
    // <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
    //   {/* <Avatar
    //     alt={params.row.name}
    //     src={params.row.coverUrl}
    //     variant="rounded"
    //     sx={{ width: 64, height: 64, mr: 2 }}
    //   /> */}
    //   <div>{params.row.serviceDecription}</div>
    // {console.log(params.row.serviceDecription)}
    // </Stack>
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params.row.issueId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellProduct.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
