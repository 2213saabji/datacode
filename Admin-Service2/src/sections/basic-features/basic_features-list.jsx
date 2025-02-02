import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { BASIC_FEATURES } from 'src/_mock/_allFeatures';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function BasicFeaturesList() {
  return (
    <div>
      {BASIC_FEATURES.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.label}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: 5 }}>
            <ul>
              {accordion.features.map((feature, idx) => (
                <li key={idx} style={{ marginBottom: '10px' }}>
                  {feature}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
