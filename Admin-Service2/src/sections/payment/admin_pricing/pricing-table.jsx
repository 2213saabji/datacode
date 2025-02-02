import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Table,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

import { _pricingPlans } from 'src/_mock'; // Import the pricingPlans array

export default function PricingTable() {
  const { name } = useParams();

  // Find the selected plan based on the route parameter
  const selectedPlan = _pricingPlans.find(
    (plan) => plan.labelAction.toLowerCase().replace(/\s+/g, '-') === name
  );

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (selectedPlan && selectedPlan.subscription === 'custom') {
      const customPlan = localStorage.getItem('customPlans');
      if (customPlan) {
        setSelectedFeatures(JSON.parse(customPlan));
      }
    }
  }, [selectedPlan]);

  const calculateSixMonthsRate = (monthlyRate) => monthlyRate * 6;
  const calculateAnnualRate = (monthlyRate) => monthlyRate * 60;
  // const calculateFiveYearRate = monthlyRate => monthlyRate * 60 * 5 * 0.90; // Applying 15% discount for 5 years
  const calculateFiveYearRate = (monthlyRate) => monthlyRate * 60 * 0.8334;
  // 16.67
  // Subtracting 15% for the offer

  const calculateTotalAmount = () => {
    if (!selectedPlan) return [0, 0, 0, 0];

    let totalMonthly = 0;
    let totalSixMonths = 0;
    let totalAnnual = 0;
    let totalFiveYear = 0;

    if (selectedPlan.subscription === 'custom') {
      selectedPlan.lists.forEach((item) => {
        if (selectedFeatures.includes(item.id)) {
          totalMonthly += item.rate;
          totalSixMonths += calculateSixMonthsRate(item.rate);
          totalAnnual += calculateAnnualRate(item.rate);
          totalFiveYear += calculateFiveYearRate(item.rate);
        }
      });
    } else {
      selectedPlan.lists.forEach((item) => {
        totalMonthly += item.rate;
        totalSixMonths += calculateSixMonthsRate(item.rate);
        totalAnnual += calculateAnnualRate(item.rate);
        totalFiveYear += calculateFiveYearRate(item.rate);
      });
    }
    return [totalMonthly, totalSixMonths, totalAnnual, totalFiveYear];
  };

  const [totalMonthly, totalAnnual, totalFiveYear] = calculateTotalAmount();

  const renderFeatures = () => {
    if (!selectedPlan) return null;

    let featuresToRender = selectedPlan.lists;

    if (selectedPlan.subscription === 'custom') {
      featuresToRender = featuresToRender.filter((item) => selectedFeatures.includes(item.id));
    }

    return featuresToRender.map((item, index) => (
      <TableRow key={index} sx={{ borderBottom: '1px solid #ddd' }}>
        <TableCell>{item.feature}</TableCell>
        <TableCell>₹ {item.rate}</TableCell>
        <TableCell>
          ₹ {calculateFiveYearRate(item.rate)}
          <span style={{ marginRight: '3px', textDecoration: 'line-through', color: 'red' }}>
            {' '}
            <sup>₹{calculateAnnualRate(item.rate)}</sup>
          </span>
        </TableCell>

        {/* <TableCell>₹ {calculateAnnualRate(item.rate)}</TableCell> */}
        {/* <TableCell>₹ <span style={{marginRight:'3px'}}>{calculateAnnualRate(item.rate)}</span>{calculateFiveYearRate(item.rate)}</TableCell> */}
      </TableRow>
    ));
  };

  //  buy button handler
  const handleBuyClick = (priceAmount) => {
    // var url = 'https://app.attplems.com/auth/jwt/register/?price=' + priceAmount;
    // window.location.href = url;
    localStorage.setItem('total', JSON.stringify(priceAmount));
  };
  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#99ccff' }}>
        Pricing & Plans
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', marginLeft: '18%', marginRight: '18%' }}
      >
        This service is related to elections and as everyone knows that according to the Indian
        constitution elections are held in India after every 5 years, keeping this in mind this
        software becomes useful only after 5 years, hence it is being sold with a 5 year
        subscription.
      </Typography>
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '20px' }}>
        <Table
          sx={{
            width: '70%',
            marginLeft: '0px',
            paddingLeft: '20px',
            marginBottom: '30px',
            borderCollapse: 'collapse',
            border: '1px solid #ddd',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Features</TableCell>
              <TableCell>Monthly</TableCell>
              {/* <TableCell>5 Year plan</TableCell> */}
              <TableCell>5 Years (with 16.67% off)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {renderFeatures()}
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell>₹ {totalMonthly}</TableCell>
              {/*               
              <TableCell>₹ {totalAnnual}</TableCell> */}
              {/* <TableCell>₹ {totalFiveYear}</TableCell> */}
              <TableCell>
                ₹ {totalFiveYear}
                <span
                  style={{
                    marginRight: '3px',
                    textDecoration: 'line-through',
                    color: 'red',
                    position: 'relative',
                  }}
                >
                  <sup> ₹{totalAnnual} </sup>
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="chooseplane">
                Choose your plan <span>&raquo;</span>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleBuyClick(totalMonthly)}
                  component={RouterLink}
                  to={{
                    pathname: '/proceed-pay/monthly', // Specify the route to navigate to
                    // state: { totalMonthly }, // Pass the total prop as state
                  }}
                >
                  Buy
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleBuyClick(totalFiveYear)}
                  component={RouterLink}
                  to={{
                    pathname: '/proceed-pay/monthly', // Specify the route to navigate to
                    // state: { totalMonthly }, // Pass the total prop as state
                  }}
                >
                  Buy
                </Button>
              </TableCell>
              {/* <TableCell><Button variant='contained'>Buy</Button></TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
