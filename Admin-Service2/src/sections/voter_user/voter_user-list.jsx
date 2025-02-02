import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useAuthContext } from 'src/auth/hooks';
import { useGetVoterView } from 'src/api/election_details';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';

// ----------------------------------------------------------------------

export default function VoterUserList() {
  const { user } = useAuthContext();

  const { claims: claimsData } = useGetVoterView(user.accessToken);

  // Check if claimsData and claimsData.data exist before accessing properties
  const electionArr = claimsData?.data && claimsData.data.length > 0 ? claimsData.data[0] : [];
  // console.log('->>>>>>>>', electionArr);
  // Check if WardDetails exists before accessing properties
  const WardDetails =
    electionArr?.WardDetails && electionArr.WardDetails.length > 0
      ? electionArr.WardDetails[0]
      : {};

  // Check if BoothDetails exists before accessing properties
  const BoothDetails =
    WardDetails?.BoothDetails && WardDetails.BoothDetails.length > 0
      ? WardDetails.BoothDetails[0]
      : {};

  return (
    <div>
      {electionArr.length === 0 ? (
        <Container maxWidth={false} sx={{ mt: 2 }}>
          <EmptyContent title="No Data" />
        </Container>
      ) : (
        <>
          {/* Election Details */}

          <Typography variant="subtitle1">Election Details</Typography>
          <Container maxWidth={false} sx={{ mt: 2 }}>
            <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
              <Stack direction="column" alignItems="start">
                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Election Title:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionTitle}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Election Type:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionType}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Election Date:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr?.electionDate?.slice(0, 10)}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Start Time:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionStartTime}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>End Time:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionEndTime}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Election Method:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionInstrumentUsed}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Election Description:</Typography>
                  <Typography sx={{ ml: 1 }}>{electionArr.electionDescription}</Typography>
                </Stack>
              </Stack>

              <Divider sx={{ mt: 3, mb: 3 }} />
            </Stack>
          </Container>

          {/* Ward Details */}

          <Typography variant="subtitle1">Ward Details</Typography>
          <Container maxWidth={false} sx={{ mt: 2 }}>
            <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
              <Stack direction="column" alignItems="start">
                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Ward Name:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.wardName}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Street Address :</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.wardStreetAddress}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>City:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.wardCity}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.wardState}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Capacity:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.wardCapacity}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Emergency No.:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.emergencyContactNumber}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Incident Reporting:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.incidentReporting}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Security Measures:</Typography>
                  <Typography sx={{ ml: 1 }}>{WardDetails?.securityMeasures}</Typography>
                </Stack>
              </Stack>

              <Divider sx={{ mt: 3, mb: 3 }} />
            </Stack>
          </Container>

          <Typography variant="subtitle1">Booth Details</Typography>

          <Container maxWidth={false} sx={{ mt: 2 }}>
            <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
              <Stack direction="column" alignItems="start">
                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Booth Name:</Typography>
                  <Typography sx={{ ml: 1 }}>{BoothDetails?.boothName}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Street Address :</Typography>
                  <Typography sx={{ ml: 1 }}>{BoothDetails?.boothStreetAddress}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>City:</Typography>
                  <Typography sx={{ ml: 1 }}>{BoothDetails?.boothCity}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
                  <Typography sx={{ ml: 1 }}>{BoothDetails?.boothState}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Capacity:</Typography>
                  <Typography sx={{ ml: 1 }}>{BoothDetails?.boothCapacity}</Typography>
                </Stack>
              </Stack>
              <Divider sx={{ mt: 3, mb: 3 }} />
            </Stack>
          </Container>

          {/* Candidate Details */}

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Candidate List
          </Typography>
          {electionArr.CandidateProfiles?.map((accordion, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Candidate Name:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.fullName}</Typography>
                </Stack>
                {/* <Typography variant="subtitle1">Candidate Name: {accordion.fullName}</Typography> */}
              </AccordionSummary>

              <AccordionDetails sx={{ padding: 5 }}>
                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Candidate Id:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.candidateId}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Gender:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.gender}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Legal Case:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.legalCase}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Education Degree:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.educationDegree}</Typography>
                </Stack>

                <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                  <Typography sx={{ mr: 1, minWidth: 180 }}>Citizenship Status:</Typography>
                  <Typography sx={{ ml: 1 }}>{accordion.citizenshipStatus}</Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </div>
  );
}
