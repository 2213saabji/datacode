import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

// import { fCurrency } from 'src/utils/format-number';
// import { fTime, fDate } from 'src/utils/format-time';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

const renderStars = (rating) => {
  const totalStars = 5; // Assuming a 5-star rating system
  const stars = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating / 2) {
      stars.push(<StarIcon key={i} style={{ color: 'gold' }} />); // Filled star
    } else {
      stars.push(<StarBorderIcon key={i} style={{ color: 'gold' }} />); // Empty star
    }
  }
  return stars;
};

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

export function RenderCellPublish({ params }) {
  return (
  
    <Label variant="soft" color={(params.row.publish === 'published' && 'info') || 'default'}>
      {renderStars(params.row.rating)}
    </Label>
    
    
  );
 
}

RenderCellPublish.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCreatedAt({ params }) {
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
          {params.row.serviceArea}
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
          {params.row.experienceLevel}
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
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Avatar
        alt={params.row.name}
        src={params.row.coverUrl}
        variant="rounded"
        sx={{ width: 64, height: 64, mr: 2 }}
      />
      <div>{params.row.providerName}</div>
    </Stack>
  );
}

RenderCellProduct.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
