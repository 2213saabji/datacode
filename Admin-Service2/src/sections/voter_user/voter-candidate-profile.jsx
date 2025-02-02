import React from 'react';
import { useParams } from 'react-router';

import { Card } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import { useGetVoterView } from 'src/api/election_details';

import CandidateProfileCover from './candidate-profile-cover';
import VoterCandidateDetail from './voter-candidate-description';

export const voter_candidates = [
  {
    index: 0,
    party: 'Bharatiya Janata Party',
    logo: '/assets/images/voteruser/bjp.jpg',
    candidatePhoto: 'https://indianexpress.com/wp-content/uploads/2023/10/Modi-23.jpg',
    candidateName: 'Narendra Modi',
    title: 'Prime Minister',
    gender: 'Male',
    legalCase: '0',
    educationDegree: 'M.B.A',
    citizenshipStatus: 'Indian',
    url: '/assets/background/overlay_1.svg',
  },
  {
    index: 1,
    party: 'Indian National Congress',
    logo: '/assets/images/voteruser/congress.webp',
    candidatePhoto:
      'https://www.livemint.com/lm-img/img/2023/06/04/1600x900/Rahul-Gandhi_1685847112071_1685847112303.jpg',
    candidateName: 'Rahul Gandhi',
    title: 'Member of Parliament',
    gender: 'Male',
    legalCase: '0',
    educationDegree: 'B.A',
    citizenshipStatus: 'Indian',
    url: '/assets/background/overlay_1.svg',
  },
  {
    index: 2,
    party: 'Aam Aadmi Party',
    logo: '/assets/images/voteruser/AAP.jpg',
    candidatePhoto:
      'https://w7.pngwing.com/pngs/514/579/png-transparent-arvind-kejriwal-chief-minister-delhi-aam-aadmi-party-punjab-rahul-gandhi-hat-moustache-2011-indian-anticorruption-movement.png',
    candidateName: 'Arvind Kejriwal',
    title: 'Chief Minister',
    gender: 'Male',
    legalCase: '0',
    educationDegree: 'B.Tech',
    citizenshipStatus: 'Indian',
    url: '/assets/background/overlay_1.svg',
  },
  // Add more parties and candidates as needed
];

export default function VoterCandidateProfile() {
  const { user } = useAuthContext();

  const { claims } = useGetVoterView(user.accessToken);

  const voterElectionDetail =
    claims && claims.data && claims?.data[0] && claims?.data[0]?.CandidateProfiles
      ? claims?.data[0]?.CandidateProfiles
      : voter_candidates;
  const { item } = useParams();
  const candidate = voterElectionDetail.filter((i) =>
    i.candidateProfileId ? i.candidateProfileId === JSON.parse(item) : i.index === JSON.parse(item)
  );

  return (
    <>
      <Card
        sx={{
          mb: 3,
          mt: 2,
          height: 290,
        }}
      >
        <CandidateProfileCover
          coverUrl={
            candidate[0]?.PartyDetail?.partySymbolImageDetails?.preview || candidate[0]?.url
          }
          candidatePhoto={
            candidate[0]?.User?.UserProfile?.userProfileImageDetails?.preview ||
            candidate[0]?.candidatePhoto
          }
          candidateName={candidate[0]?.User?.UserProfile?.firstName || candidate[0]?.candidateName}
          title={candidate[0]?.User?.UserProfile?.currentJobTitle || candidate[0]?.title}
        />
      </Card>

      <VoterCandidateDetail candidateDetails={candidate} />
    </>
  );
}
