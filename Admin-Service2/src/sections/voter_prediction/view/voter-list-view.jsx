import isEqual from 'lodash/isEqual';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import {
  useGetVoterView,
  getVotePredictions2,
  useGetVotePredictions,
} from 'src/api/election_details';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';

import VoterAnalytic from '../voter-analytic';
import ProductTableFiltersResult from '../voter-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellVotedFor,
  RenderCellCreatedAt,
} from '../voter-table-row';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function VoterListView() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { user } = useAuthContext();
  const settings = useSettingsContext();

  const [votersList, setVotersList] = useState(() => {
    const data = localStorage.getItem('votePredictList');
    if (data !== 'undefined') {
      return JSON.parse(data);
    }
    return [];
  });

  // For getting current user's election id

  const { claims: dataList } = useGetVoterView(user.accessToken);

  const dataObj = dataList && dataList.data && dataList.data.length > 0 ? dataList.data[0] : {};

  const individualElectionId = dataObj.electionId;

  // for getting all the details for particular election id

  const { votepredictions: wardList } = useGetVotePredictions(individualElectionId || 0);

  const wardObj = useMemo(
    () => (wardList && wardList.data && wardList.data.length > 0 ? wardList.data[0] : {}),
    [wardList]
  );

  const WardData =
    wardObj && wardObj.WardDetails
      ? wardObj.WardDetails.map((list) => ({
          value: list.wardId,
          label: list.wardName,
        }))
      : [];

  const WardDataForOptions = WardData.map((option) => option.value);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const defaultValues = useMemo(
    () => ({
      wardId: Number(localStorage.getItem('votePredictWardId')) || 0,
      boothId: Number(localStorage.getItem('votePredictBoothId')) || 0,
      pollingStationId: Number(localStorage.getItem('votePredictPollId')) || 0,
    }),
    []
  );

  const methods = useForm({
    defaultValues,
  });

  const { watch, setValue, reset } = methods;

  const valueForm = watch();

  // For filtering booth for selected ward

  const [boothArr, setBoothArr] = useState([]);

  useEffect(() => {
    const selectedWard =
      wardObj && wardObj.WardDetails
        ? wardObj.WardDetails.find((ward) => ward.wardId === valueForm.wardId)
        : {};

    const boothList =
      selectedWard && selectedWard.BoothDetails && selectedWard.BoothDetails.length > 0
        ? selectedWard.BoothDetails
        : [];

    setBoothArr(boothList);
  }, [valueForm.wardId, wardObj]);

  const BoothData = boothArr.map((list) => ({
    value: list.boothId,
    label: list.boothName,
  }));

  const BoothDataForOptions = BoothData.map((option) => option.value);

  // For filtering pooling station for selected booth

  const [pollArr, setPollArr] = useState([]);

  useEffect(() => {
    const selectedBooth = boothArr.find((booth) => booth.boothId === valueForm.boothId);

    const pollList =
      selectedBooth &&
      selectedBooth.PollingStationDetails &&
      selectedBooth.PollingStationDetails.length > 0
        ? selectedBooth.PollingStationDetails
        : [];

    setPollArr(pollList);
  }, [valueForm.boothId, boothArr]);

  const PollData = pollArr.map((list) => ({
    value: list.pollingStationId,
    label: list.pollingStationName,
  }));

  const PollDataForOptions = PollData.map((option) => option.value);

  useEffect(() => {
    if (
      localStorage.getItem('votePredictWardId') ||
      localStorage.getItem('votePredictBoothId') ||
      localStorage.getItem('votePredictPollId')
    ) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (valueForm.wardId !== Number(localStorage.getItem('votePredictWardId'))) {
      setValue('boothId', 0);
      setValue('pollingStationId', 0);
    }

    localStorage.setItem('votePredictWardId', valueForm.wardId);
  }, [valueForm.wardId, setValue]);

  useEffect(() => {
    if (valueForm.boothId !== Number(localStorage.getItem('votePredictBoothId'))) {
      setValue('pollingStationId', 0);
    }
    localStorage.setItem('votePredictBoothId', valueForm.boothId);
  }, [valueForm.boothId, setValue]);

  useEffect(() => {
    localStorage.setItem('votePredictPollId', valueForm.pollingStationId);
  }, [valueForm.pollingStationId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await await getVotePredictions2(
        individualElectionId || 0,
        valueForm.wardId,
        valueForm.boothId,
        valueForm.pollingStationId
      );

      if (res) {
        setVotersList([]);
        enqueueSnackbar('Voter list fetched successfully', { variant: 'success' });

        // Iterate over each ward entry
        res.data[0].WardDetails.forEach((ward) => {
          // Check if BoothDetails array is not empty
          if (ward.BoothDetails.length > 0) {
            // Iterate over each booth within the ward
            ward.BoothDetails.forEach((booth) => {
              // Check if PollingStationDetails array is not empty
              if (booth.PollingStationDetails.length > 0) {
                // Iterate over each polling station within the booth
                booth.PollingStationDetails.forEach((pollingStation) => {
                  // Check if VoterProfiles array is not empty
                  if (pollingStation.VoterProfiles.length > 0) {
                    // Iterate over each voter profile within the polling station
                    pollingStation.VoterProfiles.forEach((profile) => {
                      // Push voter profile data to the votersList array
                      setVotersList((prev) => [...prev, profile]);
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        enqueueSnackbar('Failed to get voter list', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error fetching voter list:', error);
      enqueueSnackbar('An error occurred while fetching voter list', { variant: 'error' });
    }
  };

  useEffect(() => {
    localStorage.setItem('votePredictList', JSON.stringify(votersList));
  }, [votersList]);

  const votersListArr = useMemo(
    () =>
      votersList?.map((voter) => ({
        voterId: voter?.voterProfileId,
        voterUpiId: voter?.upiId || 'not provided',
        voterName: voter?.User?.UserProfile?.firstName || voter?.User?.phone,
        voterPhone: voter?.User?.phone,
        voterEmail: voter?.User?.email,
        voterPartyId: voter?.partyId,
        user: voter?.User,
        profile: voter?.User?.UserProfile,
      })),
    [votersList]
  );

  useEffect(() => {
    if (votersListArr) {
      // Map the votersListArr data and add the voterId as the id property for each row
      const updatedTableData = votersListArr.map((voter) => ({
        ...voter,
        id: voter.voterId,
      }));
      setTableData(updatedTableData);
    }
  }, [votersListArr]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.vote_prediction.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.vote_prediction.details(encodeURIComponent(JSON.stringify(id))));
    },
    [router]
  );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'voterName',
      headerName: 'Voter Name',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'voterPhone',
      headerName: 'Phone No',
      minWidth: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'voterEmail',
      headerName: 'Email',
      flex: 1,
      minWidth: 160,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'voterUpiId',
      headerName: 'UPI ID',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: '',
      headerName: ' ',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellVotedFor params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => {
            handleViewRow(params.row);
          }}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
      ],
    },
  ];
  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <CustomBreadcrumbs
        heading="VOTER LIST"
        links={[
          {
            name: 'voter list',
          },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
          mt: 3,
        }}
      />

      {/* added component starts */}
      <Card
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <VoterAnalytic
              title="Total Voters"
              total={tableData.length}
              // total={20}
              // percent={100}
              // price={100}
              icon="solar:bill-list-bold-duotone"
              color={theme.palette.info.main}
            />

            <VoterAnalytic
              title="Total Booths"
              total={tableData.length}
              percent={100}
              // price={100}
              icon="solar:file-check-bold-duotone"
              color={theme.palette.success.main}
            />

            <VoterAnalytic
              title="Male Candidate"
              total={tableData.length}
              percent={100}
              // price={100}
              icon="solar:sort-by-time-bold-duotone"
              color={theme.palette.warning.main}
            />

            {/*  <VoterAnalytic
                title="Overdue"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:bell-bing-bold-duotone"
                color={theme.palette.error.main}
              /> */}

            <VoterAnalytic
              title="Legal Case Candidate"
              total={tableData.length}
              percent={100}
              // price={100}
              icon="solar:file-corrupted-bold-duotone"
              color={theme.palette.text.secondary}
            />
          </Stack>
        </Scrollbar>
      </Card>
      {/* added component endss */}

      <Card
        sx={{
          height: { xs: 800, md: 520 },
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        <FormProvider methods={methods} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid xs={12} md={8}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(4, 1fr)',
                }}
              >
                <RHFAutocomplete
                  sx={{ width: { md: '200px' } }}
                  name="wardId"
                  label="Ward Name"
                  options={WardDataForOptions}
                  getOptionLabel={(value) => {
                    const Ward = WardData.find((option) => option.value === value);
                    return Ward ? Ward.label : '';
                  }}
                />

                <RHFAutocomplete
                  sx={{ width: { md: '200px' } }}
                  name="boothId"
                  label="Booth Name"
                  options={BoothDataForOptions}
                  getOptionLabel={(value) => {
                    const Booth = BoothData.find((option) => option.value === value);
                    return Booth ? Booth.label : '';
                  }}
                />

                <RHFAutocomplete
                  sx={{ width: { md: '200px' } }}
                  name="pollingStationId"
                  label="Polling Station Name"
                  options={PollDataForOptions}
                  getOptionLabel={(value) => {
                    const Poll = PollData.find((option) => option.value === value);
                    return Poll ? Poll.label : '';
                  }}
                />

                <LoadingButton sx={{ width: { md: '200px' } }} type="submit" variant="contained">
                  Get Voter&apos;s List
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
        <DataGrid
          disableRowSelectionOnClick
          rows={dataFiltered}
          columns={columns}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
          slots={{
            toolbar: () => (
              <>
                <GridToolbarContainer>
                  <GridToolbarQuickFilter
                    sx={{
                      '& .MuiInputBase-input::placeholder': {
                        color: 'black',
                      },
                    }}
                  />

                  <Stack
                    spacing={1}
                    flexGrow={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarExport />
                  </Stack>
                </GridToolbarContainer>

                {canReset && (
                  <ProductTableFiltersResult
                    filters={filters}
                    onFilters={handleFilters}
                    onResetFilters={handleResetFilters}
                    results={dataFiltered.length}
                    sx={{ p: 2.5, pt: 0 }}
                  />
                )}
              </>
            ),
            noRowsOverlay: () => <EmptyContent title="No Data" />,
            noResultsOverlay: () => <EmptyContent title="No results found" />,
          }}
          slotProps={{
            columnsPanel: {
              getTogglableColumns,
            },
          }}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
