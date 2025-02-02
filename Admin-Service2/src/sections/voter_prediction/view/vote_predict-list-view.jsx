import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';

import { useAuthContext } from 'src/auth/hooks';
import { UpdateVoterProfile } from 'src/api/voter';
import { useGetVoterView, useGetVotePredictions } from 'src/api/election_details';

import FormProvider from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import {
  RenderCellVote,
  RenderCellSymbol,
  RenderCellCandidate,
  RenderCellPartyName,
} from '../voter-table-row';

// ----------------------------------------------------------------------

export default function VotePredictList({ currentVoter }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();

  const voterId = currentVoter?.data.voterProfileId;
  const pollId = currentVoter?.data.pollingStationId;

  const { user } = useAuthContext();

  // For getting current user's election id

  const { claims: dataList } = useGetVoterView(user.accessToken);

  const dataObj = dataList && dataList.data && dataList.data.length > 0 ? dataList.data[0] : {};

  const individualElectionId = dataObj.electionId;

  // for getting party details

  const { votepredictions: partyList } = useGetVotePredictions(
    individualElectionId || 0,
    0,
    0,
    pollId
  );

  const partyObj = useMemo(
    () => (partyList && partyList.data && partyList.data.length > 0 ? partyList.data[0] : {}),
    [partyList]
  );

  const partyData = useMemo(
    () =>
      partyObj && partyObj.WardDetails
        ? partyObj.CandidateProfiles.map((list) => ({
            partyId: list.partyId,
            partyName: list.PartyDetail?.partyName,
            candidateId: list.candidateProfileId,
            candidateName:
              `${list.User?.UserProfile?.firstName} ${list.User?.UserProfile?.lastName || ''}` ||
              list.User?.phone,
            candidateImg: list.User?.UserProfile?.userProfileImageDetails?.preview,
            partySymbol: list.PartyDetail?.partySymbolImageDetails?.preview,
          }))
        : [],
    [partyObj]
  );

  const [tableData, setTableData] = useState([]);

  const defaultValues = useMemo(
    () => ({
      partyId: currentVoter?.data.partyId || null,
    }),
    [currentVoter]
  );

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (currentVoter) {
      reset(defaultValues);
    }
  }, [currentVoter, defaultValues, reset]);

  const value = watch();

  useEffect(() => {
    if (partyData) {
      // Map the partyData data and add the candidateId as the id property for each row
      const updatedTableData = partyData.map((voter) => ({
        ...voter,
        id: voter.candidateId,
      }));
      setTableData(updatedTableData);
    }
  }, [partyData]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await UpdateVoterProfile(voterId, data);

      if (response) {
        enqueueSnackbar('Vote submitted successfully', { variant: 'success' });
        navigate(`/dashboard/vote_prediction`);
      } else {
        enqueueSnackbar('Failed to submit vote', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting  vote:', error);
      enqueueSnackbar('An error occurred while submitting vote', { variant: 'error' });
    }
  });

  const columns = [
    {
      field: 'candidateName',
      headerName: 'Candidate',
      minWidth: 260,
      hideable: false,
      renderCell: (params) => <RenderCellCandidate params={params} />,
    },
    {
      field: 'partyName',
      headerName: 'Party Name',
      flex: 1,
      minWidth: 260,
      renderCell: (params) => <RenderCellPartyName params={params} />,
    },
    {
      field: 'partySymbol',
      headerName: 'Party Symbol',
      minWidth: 174,
      flex: 1,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellSymbol params={params} />,
    },
    {
      field: 'action',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 160,
      renderCell: (params) => (
        <RenderCellVote
          params={params}
          setValue={setValue}
          value={value.partyId}
          onSubmit={onSubmit}
        />
      ),
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card
          sx={{
            height: { xs: 800, md: 520 },
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            disableRowSelectionOnClick
            rows={tableData}
            columns={columns}
            getRowHeight={() => 'auto'}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            slots={{
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
          />
        </Card>
      </Container>
    </FormProvider>
  );
}

VotePredictList.propTypes = {
  currentVoter: PropTypes.object,
};
