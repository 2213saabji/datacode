/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Tab, Tabs, alpha, useTheme } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-institution-agriculture';

import { useAuthContext } from 'src/auth/hooks';
import { useGetColleges } from 'src/api/Institution/college';
import { useGetcoachings } from 'src/api/Institution/coaching';
import { useGetSchoolDetails } from 'src/api/Institution/schoolDetails';
import {
  useGetStudentAppointmentsDetail,
  useGetInstituteAppointmentsDetail,
} from 'src/api/Institution/InstituteAppointments';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PartyTableFiltersResult from '../party-table-filters-result';
import {
  RenderCellBoard,
  RenderCellBatchTimings,
  RenderCellInstituteType,
  RenderCellGradesOffered,
  RenderCellUniversityName,
  RenderCellCoursesOffered,
  RenderCellHostelFacility,
  RenderCellBookingMeeting,
  RenderCellSubjectsOffered,
  RenderCellAppointmentType,
  RenderCellAppointmentTime,
  RenderCellAppointmentDate,
  RenderCellBookingInstitute,
  RenderCellCompetitiveExams,
  RenderCellAppointmentPassStatus,
  RenderCellContactSeller,
} from '../Institution-table-row';

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

export default function InstitutionListView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const { user } = useAuthContext();
  // console.log('user------->', user)

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // Fetch data of all schools

  const { schools, shoolsLoading } = useGetSchoolDetails();
  const { colleges, collegesLoading } = useGetColleges();
  const { coachings, coachingsLoading } = useGetcoachings();
  // console.log('----------->>>>', schools)
  // const ownerId = useMemo(() => localStorage.getItem('instituteOwnerDetails') !== 'undefined' && JSON.parse(localStorage.getItem('instituteOwnerDetails')), []);

  const { studentAppoint, studentAppointLoading } = useGetStudentAppointmentsDetail();
  const { InstituteAppoint, InstituteAppointLoading } = useGetInstituteAppointmentsDetail();

  //   const mySchools = useMemo(() =>
  //     schools?.data?.filter((school) => ownerId?.instituteOwnerId ? school?.instituteOwnerId === ownerId?.instituteOwnerId : [])
  //     , [schools, ownerId?.instituteOwnerId]);
  //   // console.log('mySchools------->', mySchools)

  //   const myColleges = useMemo(() =>
  //     colleges?.data?.filter((college) => ownerId?.instituteOwnerId ? college?.instituteOwnerId === ownerId?.instituteOwnerId : [])
  //     , [colleges, ownerId?.instituteOwnerId]);
  //   // console.log('myColleges------->', myColleges)

  //   const myCoaching = useMemo(() =>
  //     coachings?.data?.filter((coaching) => ownerId?.instituteOwnerId ? coaching?.instituteOwnerId === ownerId?.instituteOwnerId : [])
  //     , [coachings, ownerId?.instituteOwnerId]);

  //   const allInstitutes = useMemo(() => [
  //   ...mySchools,
  //   ...myColleges,
  //   ...myCoaching,
  // ], [mySchools, myColleges, myCoaching]);
  // console.log('allInstitutes------->', allInstitutes)
  // const FilteredAppointmentList = Appointments?.data?.filter(item => item?.Institition?.userId === user?.userId)
  // const FilteredStudentAppointmentList = Appointments?.data?.filter(item => item?.studentId === user?.userId)

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const [productSelected, setProductSelected] = useState(() => {
    const data = localStorage.getItem('currProduct');
    if (data) return data;
    return 'school';
  });

  const STATUS_OPTIONS = [
    { value: 'school', label: 'School', path: 'fa6-solid:school' },
    { value: 'college', label: 'College', path: 'maki:college' },
    {
      value: 'coachingCenter',
      label: 'Coaching Center',
      path: 'simple-icons:linuxprofessionalinstitute',
    },
    // { value: 'myInstitutions', label: 'My Institutions', path: 'simple-icons:linuxprofessionalinstitute' },
    {
      value: 'appointments',
      label: user?.userRoleId === 44 ? 'Appointments List' : 'My Appointments',
      path: 'teenyicons:appointments-outline',
    },
  ];

  useEffect(() => {
    if (productSelected === 'college' && colleges && colleges.data) {
      const updatedTableData = colleges.data.map((clg) => ({
        ...clg,
        id: clg.collegeDetailId,
      }));
      setTableData(updatedTableData);
    } else if (productSelected === 'school' && schools && schools.data) {
      const updatedTableData = schools.data.map((school) => ({
        ...school,
        id: school.schoolDetailId,
      }));
      setTableData(updatedTableData);
    } else if (productSelected === 'coachingCenter' && coachings && coachings.data) {
      const updatedTableData = coachings.data.map((coach) => ({
        ...coach,
        id: coach.coachingCenterDetailId,
      }));
      setTableData(updatedTableData);
    } else if (productSelected === 'appointments') {
      if (user?.userRoleId === 44 && InstituteAppoint && InstituteAppoint.data) {
        const updatedTableData = InstituteAppoint.data.map((appoint) => ({
          ...appoint,
          id: appoint.institutionAppointmentId,
        }));
        setTableData(updatedTableData);
      } else if (studentAppoint && studentAppoint.data) {
        const updatedTableData = studentAppoint.data.map((appoint) => ({
          ...appoint,
          id: appoint.institutionAppointmentId,
        }));
        setTableData(updatedTableData);
      }
    }
  }, [
    colleges,
    coachings,
    schools,
    studentAppoint,
    InstituteAppoint,
    productSelected,
    user?.userRoleId,
  ]);

  // useEffect(() => {
  //   if (schools && schools.data) {
  //     // Map the schools data and add the WardId as the id property for each row
  //     const updatedTableData = schools.data.map((school) => ({
  //       ...school,
  //       id: school.schoolDetailId,
  //     }));
  //     setTableData(updatedTableData);
  //   }
  // }, [schools]);

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

  const handleFilterStatus = useCallback((event, newValue) => {
    setProductSelected(newValue);
    localStorage.setItem('currProduct', newValue);
  }, []);

  const InstType = useCallback(() => {
    if (productSelected === 'school') {
      return 'schoolDetails';
    }
    if (productSelected === 'college') {
      return 'collegeDetails';
    }
    if (productSelected === 'coachingCenter') {
      return 'coachingCenterDetails';
    }
    return [];
  }, [productSelected]);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const url = `/${InstType()}/delete/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';
        // Use the DELETE HTTP method
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const response = await deleter(url, headers);

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = tableData.filter((row) => row.id !== id);
          setTableData(updatedTableData);
        } else {
          // Handle error
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, tableData, user.accessToken, InstType]
  );

  // Appointment delete
  const handleDeleteAppoint = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const url = `/instituteAppointmentBooking/delete/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';
        // Use the DELETE HTTP method
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const response = await deleter(url, headers);

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = tableData.filter((row) => row.id !== id);
          setTableData(updatedTableData);
        } else {
          // Handle error
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, tableData, user.accessToken]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/party/delete`;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, headers);

          if (response.success !== true) {
            throw new Error(response.message);
          }

          console.info('API Response:', response);
        })
      );

      // Filter out deleted rows from tableData
      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id, studentCareerOption) => {
      router.push(paths.dashboard.StudentCareer.edit(id, studentCareerOption));
    },
    [router]
  );
  const handleEditAppointment = useCallback(
    (id) => {
      router.push(paths.dashboard.StudentCareer.editAppointment(id));
    },
    [router]
  );

  const handleViewAppointmentRow = useCallback(
    // enqueueSnackbar('Coming Soon...', { variant: 'success' });
    (id) => {
      router.push(paths.dashboard.StudentCareer.viewAppointment(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      if (productSelected === 'school') {
        router.push(paths.dashboard.StudentCareer.instituteDetails(id));
      } else if (productSelected === 'college') {
        router.push(paths.dashboard.StudentCareer.collegeDetails(id));
      } else if (productSelected === 'coachingCenter') {
        router.push(paths.dashboard.StudentCareer.coachingCenterDetails(id));
      } else if (productSelected === 'myAppointments') {
        router.push(paths.dashboard.StudentCareer.appointmnetDetails(id));
      } else {
        router.push(paths.dashboard.StudentCareer.instituteDetails(id));
      }
    },
    [productSelected, router]
  );

  const clgColumns = [
    {
      field: 'universityAffiliation',
      headerName: 'University',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellUniversityName params={params} />,
    },
    {
      field: 'coursesOffered',
      headerName: 'Courses Offered',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellCoursesOffered params={params} />,
    },
    {
      field: 'hostelFacility',
      headerName: 'Hostel Facility',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellHostelFacility params={params} />,
    },
    {
      field: 'placementRecord',
      headerName: 'Placement Record',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellInstituteType params={params} />,
    },
    {
      field: 'instituteBooking',
      headerName: 'Book Appointment',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellBookingInstitute params={params} />,
    },
    user?.userRoleId !== 44 && {
      field: 'contactOwner',
      headerName: 'Contact Owner',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellContactSeller params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const { institutionOwnerId } = params.row
        const actions = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewRow(params.row.id)}
          />,
        ];

        if (user?.userRoleId === 44) {
          if (user?.userId === institutionOwnerId) {
            actions.push(
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => handleEditRow(params.row.id, 'college')}
              />,
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => handleDeleteRow(params.row.id)}
                sx={{ color: 'error.main' }}
              />
            );
          }
        }

        return actions;
      },
    },
  ];

  const coachingColumns = [
    {
      field: 'batchTimings',
      headerName: 'Batch Timings',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellBatchTimings params={params} />,
    },
    {
      field: 'subjectsOffered',
      headerName: 'Subjects Offered',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellSubjectsOffered params={params} />,
    },
    {
      field: 'competitiveExams',
      headerName: 'Competitive Exams',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellCompetitiveExams params={params} />,
    },
    {
      field: 'instituteBooking',
      headerName: 'Book Appointment',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellBookingInstitute params={params} />,
    },
    user?.userRoleId !== 44 && {
      field: 'contactOwner',
      headerName: 'Contact Owner',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellContactSeller params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const { institutionOwnerId } = params.row
        const actions = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewRow(params.row.id)}
          />,
        ];

        if (user?.userRoleId === 44) {
          if (user?.userId === institutionOwnerId) {
            actions.push(
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => handleEditRow(params.row.id, 'coaching')}
              />,
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => handleDeleteRow(params.row.id)}
                sx={{ color: 'error.main' }}
              />
            );
          }
        }
        return actions;
      },
    },
  ];

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    // {
    //   field: 'collegeDetailId',
    //   headerName: 'Institute Name',
    //   flex: 1,
    //   minWidth: 180,
    //   hideable: false,
    //   renderCell: (params) => <RenderCellInstituteName params={params} />,
    // },
    {
      field: 'board',
      headerName: 'Board',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellBoard params={params} />,
    },
    {
      field: 'hostelFacility',
      headerName: 'Hostel Facility',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellHostelFacility params={params} />,
    },
    {
      field: 'gradesOffered',
      headerName: 'Grades Offered',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellGradesOffered params={params} />,
    },
    {
      field: 'instituteBooking',
      headerName: 'Book Appointment',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellBookingInstitute params={params} />,
    },
    user?.userRoleId !== 44 && {
      field: 'contactOwner',
      headerName: 'Contact Owner',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellContactSeller params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const { institutionOwnerId } = params.row
        const actions = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewRow(params.row.id)}
          />,
        ];

        if (user?.userRoleId === 44) {
          if (user?.userId === institutionOwnerId) {
            actions.push(
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => handleEditRow(params.row.id, 'school')}
              />,
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => handleDeleteRow(params.row.id)}
                sx={{ color: 'error.main' }}
              />
            );
          }
        }
        return actions;
      },
    },
  ];

  const appointmentColumns = [
    // {
    //   field: 'instituteAppName',
    //   headerName: 'Institute Name',
    //   flex: 1,
    //   minWidth: 180,
    //   hideable: false,
    //   renderCell: (params) => <RenderCellInstituteAppName params={params} />,
    // },
    {
      field: 'appointmentType',
      headerName: 'Appointment Type',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellAppointmentType params={params} />,
    },
    {
      field: 'appointmentDate',
      headerName: 'Appointment Date',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellAppointmentDate params={params} />,
    },
    {
      field: 'appointmentTime',
      headerName: 'Appointment Time',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellAppointmentTime params={params} />,
    },
    {
      field: 'appointmentPassStatus',
      headerName: 'Status',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellAppointmentPassStatus params={params} />,
    },
    {
      field: 'appointmentPassMeetingLink',
      headerName: 'Meeting Link',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellBookingMeeting params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const { institutionOwnerId } = params.row
        const actions = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewAppointmentRow(params.row.id)}
          />,
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Delete"
            onClick={() => handleDeleteAppoint(params.row.id)}
            sx={{ color: 'error.main' }}
          />,
        ];

        if (user?.userRoleId === 44) {
          if (user?.userId === institutionOwnerId) {
            actions.push(
              <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Update"
                onClick={() => handleEditAppointment(params.row.id)}
              />
            );
          }
        }
        return actions;
      },
    },
  ];

  const renderColumns = () => {
    if (productSelected === 'school') {
      return columns;
    }
    if (productSelected === 'college') {
      return clgColumns;
    }
    if (productSelected === 'coachingCenter') {
      return coachingColumns;
    }
    if (productSelected === 'appointments') {
      return appointmentColumns;
    }
    return [];
  };

  const { open, openPaymentModal } = useAuthContext();

  const handleClick = (url) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(url);
    }
  };

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <Button
          component={RouterLink}
          to="/dashboard"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
        >
          Back
        </Button> */}

        <CustomBreadcrumbs
          heading="INSTITUTION LIST"
          links={[
            {
              name: 'Institution',
              href: paths.dashboard,
            },
            { name: 'List' },
          ]}
          action={
            <>
              {user.userRoleId === 9 && (
                <Button
                  onClick={() => {
                    localStorage.setItem("profileViewTab", "updateaccount");
                    handleClick(paths.dashboard.user.profile);
                  }}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  UPGRADE TO REGISTER INSTITUTE
                </Button>
              )}

              {/* {user.userRoleId === 44 && (
                <Button
                  onClick={() => handleClick(paths.dashboard.StudentCareer.instituteNew)}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  Register Your Institution
                </Button>
              )} */}
            </>
          }

          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            mt: 3,
          }}
        />

        {/* analytic start here */}
        {/* <Card
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
              <PartyManagementAnalytics
                title="Total schools"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <PartyManagementAnalytics
                title="Total Candidate"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <PartyManagementAnalytics
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <PartyManagementAnalytics
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card> */}

        {/* analytic ends here */}

        <Card
          sx={{
            // height: { xs: 800, md: 2 },
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <Tabs
            value={productSelected}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme2) => `inset 0 -2px 0 0 ${alpha(theme2.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="start"
                value={tab.value}
                label={tab.label}
                sx={{ color: tab.value === productSelected && theme.palette.primary.main }}
                icon={
                  <Iconify
                    icon={tab.path}
                    variant={(tab.value === productSelected && 'primary') || 'soft'}
                    color={tab.value === productSelected && theme.palette.primary.main}
                  />
                }
              />
            ))}
          </Tabs>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={renderColumns()}
            loading={shoolsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
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
                      {/* {!!selectedRowIds?.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds?.length})
                        </Button>
                      )} */}

                      {/* <GridToolbarColumnsButton /> */}
                      {/* <GridToolbarFilterButton /> */}
                      {/* <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <PartyTableFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered?.length}
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

      {/* <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds?.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock?.length) {
    inputData = inputData.filter((product) => stock?.includes(product.inventoryType));
  }

  if (publish?.length) {
    inputData = inputData.filter((product) => publish?.includes(product.publish));
  }

  return inputData;
}
