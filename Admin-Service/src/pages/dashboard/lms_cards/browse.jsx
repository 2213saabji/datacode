import React from 'react';

import {
  Box,
  Card,
  Grid,
  Button,
  Container,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import LmsCardHero from './lms_hero';

const data = [
  {
    imageUrl: '/assets/Lms_card/m1.png',
    title: 'Ministry of Law and Justice',
    url: 'https://lawmin.gov.in/',
    description:
      'Provides updates on laws, notifications, and regulations from the Indian government.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'National Portal of India',
    url: 'https://www.india.gov.in/',
    description:
      'A centralized platform offering a wide range of government services, including legal services and citizen charters.',
  },
  {
    imageUrl: '/assets/Lms_card/m3.png',
    title: 'eCourts Services',
    url: 'https://ecourts.gov.in/',
    description:
      'Offers services like case status, daily orders, and judgments from Indian courts.',
  },
  {
    imageUrl: '/assets/Lms_card/m1.png',
    title: 'Ministry of Corporate Affairs (Registrar of Companies - ROC)',
    url: 'https://www.mca.gov.in/',
    description: 'Facilitates matters related to company law and the registration of companies.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'Income Tax Department',
    url: 'https://www.incometaxindia.gov.in/',
    description:
      'Provides tax-related information, guidelines, and official forms for individuals and businesses.',
  },
  {
    imageUrl: '/assets/Lms_card/m3.png',
    title: 'Public Grievance Portal',
    url: 'https://pgportal.gov.in/',
    description: 'Allows citizens to file grievances against government departments and officials.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'Central Board of Direct Taxes',
    url: 'https://www.incometaxindia.gov.in/Pages/about-us/central-board-direct-taxes.aspx',
    description: 'Offers resources related to tax disputes and tax-related assistance.',
  },
  {
    imageUrl: '/assets/Lms_card/m1.png',
    title: 'Consumer Protection Portal',
    url: 'https://consumerhelpline.gov.in/',
    description:
      'Provides information on filing consumer complaints and handling consumer disputes.',
  },
  {
    imageUrl: '/assets/Lms_card/m3.png',
    title: 'NITI Aayog',
    url: 'https://www.niti.gov.in/',
    description:
      'Offers insights into government policies, national schemes, and development initiatives in India.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'Bar Council of India',
    url: 'http://www.barcouncilofindia.org/',
    description:
      'Provides information on recognized legal professionals and standards within the legal profession in India.',
  },
  {
    imageUrl: '/assets/Lms_card/m1.png',
    title: 'Official Gazette of India',
    url: 'https://egazette.nic.in/',
    description:
      'Publishes official notices, laws, and regulations relevant to the legal profession.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'National Legal Services Authority (NALSA)',
    url: 'http://nalsa.gov.in/',
    description:
      'Provides access to legal aid services, especially for those who cannot afford legal representation.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'Supreme Court of India',
    url: 'https://www.sci.gov.in/',
    description:
      'Access to Supreme Court judgments, case status, and other important legal resources.',
  },
  {
    imageUrl: '/assets/Lms_card/m2.png',
    title: 'State Legal Services Authorities (India)',
    url: 'https://www.mslsa.org/',
    description: 'Provide legal aid and services at the state level.',
  },
  {
    imageUrl: '/assets/Lms_card/m3.png',
    title: 'Digital India Initiatives (e-Governance)',
    url: 'https://www.digitalindia.gov.in/',
    description:
      'Offers various e-governance services in India that can be linked for enhanced functionality.',
  },
];

const GovernmentLinksPage = () => (
  <>
    <Button
      component={RouterLink}
      to="/dashboard"
      variant="outlined"
      color="primary"
      style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
    >
      Back
    </Button>
    <Container>
      <LmsCardHero />
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Government Legal Resources
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Explore essential government websites for legal resources in India.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <CardMedia>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    onClick={() => window.open(item.url, '_blank')}
                  />
                </CardMedia>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.description}
                </Typography>
                {/* <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => window.open(item.url, '_blank')}
                                >
                                    Visit Website
                                </Button> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

export default GovernmentLinksPage;
