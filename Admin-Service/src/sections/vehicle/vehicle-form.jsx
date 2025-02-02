import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, TextField, Typography, FormHelperText } from '@mui/material';
import { Stack } from '@mui/system';
import { Hostel_Facility } from 'src/_mock';
import { RHFAutocomplete, RHFTextField, RHFRadioGroup, RHFUpload } from 'src/components/hook-form';
import { Upload } from 'src/components/upload';

const VehicleFields = ({ theme, vehicleOptions, handleDrop, handleRemoveFile, docs, errors, values }) => {
  console.log(docs)
  return (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
      }}
    >
      <RHFTextField
        name="vehicleName"
        label="Vehicle Name"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="model"
        label="Model"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="year"
        label="Year"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="chassisNumber"
        label="Chassis Number"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFAutocomplete
        name="vehicleType"
        label="Vehicle Type"
        placeholder=" Choose Payment Method"
        fullWidth
        options={vehicleOptions.map((option) => option.label)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vehicle Type"
            InputProps={{
              ...params.InputProps,
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
                fontSize: '35px',
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
              },
            }}
          />
        )}
      />
      <RHFTextField
        name="color"
        label="Color"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      {/* <RHFTextField
      name="pricePerKm"
      label="Price Per Km"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      <RHFTextField
        name="manufacturingYear"
        label="Manufacturing Year"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />

      <RHFTextField
        name="engineNumber"
        label="Engine Number"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="fuelType"
        label="Fuel Type"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      {/* <RHFTextField
      name="fuelEfficiency"
      label="Fuel Efficiency"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      <RHFTextField
        name="grossVehicleWeight"
        label="Gross Vehicle Weight"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="registrationNumber"
        label="Registration Number"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      {/* <RHFTextField
      name="weightCapacity"
      label="Weight Capacity"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="licensePlate"
      label="Vehicle Number"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="insuranceInfo"
      label="Insurance Info"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      <RHFTextField
        name="maintenanceHistory"
        label="Maintenance History"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="vehicleCondition"
        label="Vehicle Condition"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />

      {/* <RHFTextField
      name="ownerInfo"
      label="Owner Info"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="accessibilityFeature"
      label="Accessibility Feature"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="safetyFeature"
      label="Safety Feature"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="licenseRenewalDate"
      InputLabelProps={{ shrink: true }}
      label="License Renewal Date"
      type="date"
      renderInput={(params) => (
        <TextField
          {...params}
          label="License Renewal Date"
          InputProps={{
            ...params.InputProps,
            style: {
              color: theme.palette.mode === 'light' ? 'black' : 'white',
              fontSize: '35px',
            },
          }}
          InputLabelProps={{
            style: {
              color: theme.palette.mode === 'light' ? 'black' : 'white',
            },
          }}
        />
      )}
    /> */}

      {/* <RHFTextField
      name="vinNumber"
      label="Vin Number"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="averageMileage"
      label="Average Mileage"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="vehicleImageUrl"
      label="Vehicle ImageUrl"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="vehicleWeight"
      label="Vehicle Weight"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField name="tireSize" label="Tire Size" /> */}
      {/* <RHFTextField
      name="licenseExpiryDate"
      InputLabelProps={{ shrink: true }}
      label="License Expiration Date"
      type="date"
      renderInput={(params) => (
        <TextField
          {...params}
          label="License Expiration Date"
          InputProps={{
            ...params.InputProps,
            style: {
              color: theme.palette.mode === 'light' ? 'black' : 'white',
              fontSize: '35px',
            },
          }}
          InputLabelProps={{
            style: {
              color: theme.palette.mode === 'light' ? 'black' : 'white',
            },
          }}
        />
      )}
    /> */}
      <RHFTextField
        name="insuranceExpiryDate"
        InputLabelProps={{ shrink: true }}
        label="Insurance Expiry Date"
        type="date"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Insurance Expiry Date"
            InputProps={{
              ...params.InputProps,
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
                fontSize: '35px',
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
              },
            }}
          />
        )}
        value = {values.insuranceExpiryDate}
      />
      <Card>
        <Stack spacing={0} sx={{ p: 3 }}>
          <Typography variant="subtitle2">GPS Tracking</Typography>
          <RHFRadioGroup row spacing={4} name="gpsTracking" options={Hostel_Facility} />
        </Stack>
      </Card>
      <Card>
        <Stack spacing={0} sx={{ p: 3 }}>
          <Typography variant="subtitle2">Availability</Typography>
          <RHFRadioGroup row spacing={4} name="availability" options={Hostel_Facility} />
        </Stack>
      </Card>
      {/* <RHFTextField
      name="vehicleSeatingConfiguration"
      label="Vehicle Seating Configuration"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}

      {/* <RHFTextField
      name="audioEntertainmentSystem"
      label="Audio Entertainment System"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      <RHFTextField
        name="additionalEquipment"
        label="Additional Equipment"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <Stack spacing={1.5} sx={{ gridColumn: 'span 2' }}>
        <Typography variant="subtitle2">Vehicle Image</Typography>
        <RHFUpload
          name="vehicleImageUrl"
          maxSize={8388608}
          onDrop={(file) =>
            handleDrop(file, 'vehicleImageUrl', 'Vehicle image uploaded successfully')
          }
          onDelete={() => handleRemoveFile('vehicleImageUrl')}
        />
      </Stack>

      <Stack spacing={1.5} sx={{ gridColumn: 'span 2' }}>
        <Typography variant="subtitle2">Insurance PDF</Typography>
        <Upload
          name="insurancePdf"
          file={docs?.insurancePdf}
          error={errors?.insurancePdf?.message}
          onDrop={(file) => handleDrop(file, 'insurancePdf', 'Insurance file uploaded successfully')}
          onDelete={() => handleRemoveFile('insurancePdf')}
        />
        {errors?.insurancePdf?.message && (
          <FormHelperText error={!!errors?.insurancePdf?.message} sx={{ px: 2 }}>
            {errors?.insurancePdf?.message}
          </FormHelperText>
        )}
      </Stack>

      <Stack spacing={1.5} sx={{ gridColumn: 'span 2' }}>
        <Typography variant="subtitle2">RC PDF</Typography>
        <Upload
          name="rcPdf"
          file={docs?.rcPdf}
          error={errors?.rcPdf?.message}
          onDrop={(file) => handleDrop(file, 'rcPdf', 'RC file uploaded successfully')}
          onDelete={() => handleRemoveFile('rcPdf')}
        />
        {errors?.rcPdf?.message && (
          <FormHelperText error={!!errors?.rcPdf?.message} sx={{ px: 2 }}>
            {errors?.rcPdf?.message}
          </FormHelperText>
        )}
      </Stack>
      {/* <RHFTextField
      name="usageRestrictions"
      label="Usage Restrictions"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="specialFeatures"
      label="Special Features"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
      {/* <RHFTextField
      name="policyNumber"
      label="Policy Number"
      InputProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
      }}
    /> */}
    </Box>
  )
};

VehicleFields.propTypes = {
  theme: PropTypes.shape({
    palette: PropTypes.object.isRequired, // Validate the palette property within theme
  }).isRequired,
  vehicleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDrop: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  values: PropTypes.object,
  docs: PropTypes.shape({
    rcPdf: PropTypes.object, // or PropTypes.any if the type is dynamic
    insurancePdf: PropTypes.object,
    vehicleImageUrl: PropTypes.object,
  }),
  errors: PropTypes.shape({
    rcPdf: PropTypes.shape({
      message: PropTypes.string,
    }),
    insurancePdf: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

export default VehicleFields;
