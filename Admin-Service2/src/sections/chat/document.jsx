import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';

const DocumentPreview = ({ fileUrl }) => {
  console.log(fileUrl);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image={fileUrl}
        title="green iguana"
      /> */}
      <img src={fileUrl} alt="Cover" style={{ height: '100px' }} />
      {/* <CardContent> <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
     
       
      </CardContent> */}
      <CardActions>
        <Button size="lg">Open</Button>
        <Button size="lg">Save</Button>
      </CardActions>
    </Card>
  );
};
DocumentPreview.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};

export default DocumentPreview;
