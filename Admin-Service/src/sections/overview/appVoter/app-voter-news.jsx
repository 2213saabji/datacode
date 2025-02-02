// import Stack from '@mui/material/Stack';
 
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
 
// import { _appFeatured } from 'src/_mock';
 
import ReactPlayer from 'react-player';
import { keyframes } from '@emotion/react';
 
import { Box } from '@mui/system';
import { Button } from '@mui/material';
 
import { paths } from 'src/routes/paths';
 
import { useSettingsContext } from 'src/components/settings';
 
import CarouselAnimation from 'src/sections/_examples/extra/carousel-view/carousel-animation';
import { useGetAllLocalNews } from 'src/api/news';
import { useAuthContext } from 'src/auth/hooks';
 
const moveText = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;
// ----------------------------------------------------------------------
 
const _carouselsExample = [
  {
    id: 0,
    title: 'Electicity Problem',
    // title: 'National Election News',
    // oucoverUrl:
    //   'https://attplgrppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716205425-Electricity Problem-min.png',
    coverUrl: '/assets/images/complaintSection2/LightProblem.webp',
    description: 'Phase 1 summary',
    // path:"https://www.pspcl.in/",
  },
  {
    id: 1,
    title: 'Water Problem',
    // title: 'National Election  News',
    coverUrl: '/assets/images/complaintSection2/WaterProblems.webp',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714717076132-Water Problems-min.png',
    // coverUrl: 'https://bl-i.thgim.com/public/incoming/58sf19/article68082685.ece/alternates/LANDSCAPE_1200/PTI04_19_2024_000100B.jpg',
    description: 'Phase 1 summary',
  },
  {
    id: 2,
    title: 'Education Problem',
    // title: 'National Election News',
    coverUrl: '/assets/images/complaintSection2/Schoolsandcolleges.webp',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716961689-School and Colleges Problems-min.png',
    // coverUrl: 'https://cdn.zeebiz.com/sites/default/files/2024/04/17/288620-lok-sabha-polls-phase-1.jpg',
    description: 'Phase 1 summary',
  },
  {
    id: 3,
    title: 'Road Problem',
    // title: 'National Election News',
    coverUrl: '/assets/images/complaintSection2/RoadIssue.webp',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716902058-Road Issue-min.png',
    // coverUrl: 'https://thefederal.com/h-upload/2024/04/17/441019-phase-1.webp',
    description: 'Phase 1 summary',
  },
  {
    id: 4,
    title: 'Food Problem',
    // title: 'National Election  News',
    coverUrl: '/assets/images/complaintSection2/FoodProblem.webp',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716698218-Food Problem-min.png',
    // coverUrl: 'https://bl-i.thgim.com/public/incoming/58sf19/article68082685.ece/alternates/LANDSCAPE_1200/PTI04_19_2024_000100B.jpg',
    description: 'Phase 1 summary',
  },
  {
    id: 5,
    title: 'Seawage Problem',
    // title: 'National Election News',
    coverUrl: '/assets/images/complaintSection2/SewageProblem.webp',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714717009125-Seawage Problem-min.png',
    // // coverUrl: 'https://cdn.zeebiz.com/sites/default/files/2024/04/17/288620-lok-sabha-polls-phase-1.jpg',
    description: 'Phase 1 summary',
  },
  {
    id: 6,
    title: 'Pipeline Problem',
    coverUrl: '/assets/images/complaintSection2/GasPipelineissue.webp',
    // title: 'National Election  News',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716867191-Pipeline issue-min.png',
    // coverUrl: 'https://bl-i.thgim.com/public/incoming/58sf19/article68082685.ece/alternates/LANDSCAPE_1200/PTI04_19_2024_000100B.jpg',
    description: 'Phase 1 summary',
  },
  {
    id: 7,
    title: 'Health Problem',
    coverUrl: '/assets/images/complaintSection2/Hospitalissue.webp',
    // title: 'National Election News',
    // coverUrl:
    //   'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1714716755969-Health and Hospital Issue-min.png',
    // coverUrl: 'https://cdn.zeebiz.com/sites/default/files/2024/04/17/288620-lok-sabha-polls-phase-1.jpg',
    description: 'Phase 1 summary',
  },
];
 
const _carouselsExample2 = [
  {
    id: 0,
    title: 'Prime Minister',
    coverUrl: '/assets/images/ALLCM/Modi.png',
    description: 'Shri Narendra Modi',
    path: paths.dashboard.voterview.info(0),
  },
  // {
  //   id: 1,
  //   title: 'CM',
  //   coverUrl: '/assets/images/ALLCM/Rahul Gandhi.png',
  //   description: 'Shri Rahul Gandhi',
  //   path: paths.dashboard.voterview.info(1),
  // },
  {
    id: 1,
    title: 'Andhra Pradesh CM',
    coverUrl: '/assets/images/ALLCM/Andhra Pradesh.webp',
    description: 'Shri Nara Chandrababu Naidu',
    path: paths.dashboard.voterview.info(1),
  },
  {
    id: 2,
    title: 'Arunachal Pradesh CM',
    coverUrl: '/assets/images/ALLCM/Arunachal Pradesh.webp',
    description: 'Shri Pema Khandu',
    path: paths.dashboard.voterview.info(2),
  },
  {
    id: 3,
    title: 'Chhattisgarh CM',
    coverUrl: '/assets/images/ALLCM/Chhattisgarh.webp',
    description: 'Shri Vishnu Deo Sai',
    path: paths.dashboard.voterview.info(3),
  },
  {
    id: 4,
    title: 'Delhi CM',
    coverUrl: '/assets/images/ALLCM/Delhi (NCT).webp',
    description: 'Shri Arvind Kejriwal',
    path: paths.dashboard.voterview.info(4),
  },
  {
    id: 5,
    title: 'Gujarat CM',
    coverUrl: '/assets/images/ALLCM/Gujarat.webp',
    description: 'Shri Bhupendra Patel',
    path: paths.dashboard.voterview.info(5),
  },
  {
    id: 6,
    title: 'Haryana CM',
    coverUrl: '/assets/images/ALLCM/Haryana.webp',
    description: 'Shri Nayab Singh Saini',
    path: paths.dashboard.voterview.info(6),
  },
  {
    id: 7,
    title: 'Himachal Pradesh CM',
    coverUrl: '/assets/images/ALLCM/Himachal Pradesh.webp',
    description: 'Shri Sukhvinder Singh ',
    path: paths.dashboard.voterview.info(7),
  },
  {
    id: 8,
    title: 'Jharkhand CM',
    coverUrl: '/assets/images/ALLCM/Jharkhand.webp',
    description: 'Shri Hemant Soren',
    path: paths.dashboard.voterview.info(8),
  },
  {
    id: 9,
    title: 'Karnataka CM',
    coverUrl: '/assets/images/ALLCM/Karnataka.webp',
    description: 'Shri Siddaramaiah',
    path: paths.dashboard.voterview.info(9),
  },
  {
    id: 10,
    title: 'Kerala CM',
    coverUrl: '/assets/images/ALLCM/Kerala.webp',
    description: 'Shri Pinarayi Vijayan',
    path: paths.dashboard.voterview.info(10),
  },
  {
    id: 11,
    title: 'Madhya Pradesh CM',
    coverUrl: '/assets/images/ALLCM/Madhya Pradesh.webp',
    description: 'Shri Mohan Yadav',
    path: paths.dashboard.voterview.info(11),
  },
  {
    id: 12,
    title: 'Maharashtra CM',
    coverUrl: '/assets/images/ALLCM/Maharashtra.webp',
    description: 'Shri Eknath Shinde',
    path: paths.dashboard.voterview.info(12),
  },
  {
    id: 13,
    title: 'Manipur CM',
    coverUrl: '/assets/images/ALLCM/Manipur.webp',
    description: 'Shri N. Biren Singh',
    path: paths.dashboard.voterview.info(13),
  },
  {
    id: 14,
    title: 'Meghalaya CM',
    coverUrl: '/assets/images/ALLCM/Meghalaya.webp',
    description: 'Shri Conrad Kongkal Sangma',
    path: paths.dashboard.voterview.info(14),
  },
  {
    id: 15,
    title: 'Mizoram CM',
    coverUrl: '/assets/images/ALLCM/Mizoram.webp',
    description: 'Shri PU Lalduhoma',
    path: paths.dashboard.voterview.info(15),
  },
  {
    id: 16,
    title: 'Nagaland CM',
    coverUrl: '/assets/images/ALLCM/Nagaland.webp',
    description: 'Shri Neiphiu Rio',
    path: paths.dashboard.voterview.info(16),
  },
  {
    id: 17,
    title: 'Odisha CM',
    coverUrl: '/assets/images/ALLCM/Odisha.webp',
    description: 'Shri Mohan Charan Majhi',
    path: paths.dashboard.voterview.info(17),
  },
  {
    id: 18,
    title: 'Puducherry CM',
    coverUrl: '/assets/images/ALLCM/Puducherry (UT).webp',
    description: 'Shri N. Rangaswamy',
    path: paths.dashboard.voterview.info(18),
  },
  {
    id: 19,
    title: 'Punjab CM',
    coverUrl: '/assets/images/ALLCM/Punjab.webp',
    description: 'Shri Bhagwant Singh Mann',
    path: paths.dashboard.voterview.info(19),
  },
  {
    id: 20,
    title: 'Rajasthan CM',
    coverUrl: '/assets/images/ALLCM/Rajasthan.webp',
    description: 'Shri Bhajan Lal Sharma',
    path: paths.dashboard.voterview.info(20),
  },
  {
    id: 21,
    title: 'Sikkim CM',
    coverUrl: '/assets/images/ALLCM/Sikkim.webp',
    description: 'Shri PS Golay',
    path: paths.dashboard.voterview.info(21),
  },
  {
    id: 22,
    title: 'Tamil Nadu CM',
    coverUrl: '/assets/images/ALLCM/Tamil Nadu.webp',
    description: 'Shri M. K. Stalin',
    path: paths.dashboard.voterview.info(22),
  },
  {
    id: 23,
    title: 'Assam CM',
    coverUrl: '/assets/images/ALLCM/Shri Himanta Biswa Sarma.webp',
    description: 'Shri Himanta Biswa Sarma',
    path: paths.dashboard.voterview.info(23),
  },
  {
    id: 24,
    title: 'Bihar CM',
    coverUrl: '/assets/images/ALLCM/Shri Nitish Kumar.webp',
    description: 'Shri Nitish Kumar',
    path: paths.dashboard.voterview.info(24),
  },
  {
    id: 25,
    title: 'Goa CM',
    coverUrl: '/assets/images/ALLCM/Shri Pramod Sawant.webp',
    description: 'Shri Pramod Sawant',
    path: paths.dashboard.voterview.info(25),
  },
  {
    id: 26,
    title: 'Telangana CM',
    coverUrl: '/assets/images/ALLCM/Telangana.webp',
    description: 'Shri A Revanth Reddy',
    path: paths.dashboard.voterview.info(26),
  },
  {
    id: 27,
    title: 'Tripura CM',
    coverUrl: '/assets/images/ALLCM/Tripura.webp',
    description: 'Dr. Manik Saha',
    path: paths.dashboard.voterview.info(27),
  },
  {
    id: 28,
    title: 'Uttar Pradesh CM',
    coverUrl: '/assets/images/ALLCM/Uttar Pradesh.webp',
    description: 'Shri Yogi Aditya Nath',
    path: paths.dashboard.voterview.info(28),
  },
  {
    id: 29,
    title: 'Uttarakhand CM',
    coverUrl: '/assets/images/ALLCM/Uttarakhand.webp',
    description: 'Shri Pushkar Singh Dhami',
    path: paths.dashboard.voterview.info(29),
  },
  {
    id: 30,
    title: 'West Bengal CM',
    coverUrl: '/assets/images/ALLCM/West Bengal.webp',
    description: 'Km. Mamata Banerjee',
    path: paths.dashboard.voterview.info(30),
  },
];
 
const _carouselsExample3 = [
  {
    id: 0,
    title: 'TV9 Telugu News',
    coverUrl: 'https://images.tv9telugu.com/wp-content/uploads/2024/05/website.png?w=1280',
    // description: 'TV9 Telugu News',
    main: 'https://tv9telugu.com/',
    youtube: 'https://www.youtube.com/live/q31yu9WQe18?si=9FLQr20EnW74L917',
  },
  {
    id: 1,
    title: 'news18 News',
    coverUrl:
      'https://images.news18.com/ibnkhabar/uploads/2024/05/amit-shah-interview1-2024-05-5a5debfcdd54a4dd026bdc7645534b6a.jpg?impolicy=website&width=540&height=360',
    // description: 'news18 News',
    main: 'https://www.news18.com/livetv/',
    youtube: 'https://www.youtube.com/live/HBorWH77wPs?si=zFyUnQgOhv5OzcRo',
  },
  {
    id: 2,
    title: 'IBC24 News',
    coverUrl: 'https://media.ibc24.in/wp-content/uploads/2024/05/modi-1.jpg',
    // description: 'IBC24 News',
    main: 'https://www.ibc24.in/live-tv/',
    youtube: 'https://www.youtube.com/live/OFymaut_-go?si=eqcAR8NffNGXTIGH',
  },
  {
    id: 3,
    title: 'GSTV News',
    coverUrl:
      'https://www.gstv.in/backend/public/media/supremecourtofindiajpg_mXhhcr0I1714660391_medium.jpg',
    // description: 'GSTV News',
    main: 'https://www.youtube.com/live/E63v-bPKZiw?si=90IxHtL93g377pon',
    youtube: 'https://www.youtube.com/live/qbW7nGojvkM?si=g18hE2Jlgn_Rv2d7',
  },
 
];
 
const _carouselsExample4 = [
  {
    id: 0,
    title: 'Aaj Tak',
    coverUrl:
      'https://akm-img-a-in.tosshub.com/aajtak/images/story/201903/aajtak1_1552056536_749x421.jpeg?size=948:533',
    description: '',
    main: 'https://www.aajtak.in/livetv',
    youtube: 'https://www.youtube.com/live/Nq2wYlWFucg?si=hM-F21gxnKFhjIcB',
  },
  {
    id: 1,
    title: 'NDTV',
    coverUrl: 'https://c.ndtvimg.com/2023-09/tp922vsg_ndtv-24x7_624x370_02_September_23.jpg',
    description: '',
    main: 'https://ndtv.in/livetv-ndtvindia',
    youtube: "https://www.youtube.com/live/M8F2jQBRmyM?si=a7p-E9EsieeILamJ",
  },
  // 'https://ndtv.in/videos/embed-player/?id=DEFAULT_VIDEO_ID&mute=1&autostart=1&mutestart=true&pWidth=100&pHeight=100'
  {
    id: 2,
    title: 'Republic India',
    coverUrl: 'https://www.medianews4u.com/wp-content/uploads/2017/10/repulic-with-R-logo-2.jpg',
    description: '',
    main: 'https://content.jwplatform.com/previews/ADe4psmE',
    youtube: 'https://www.youtube.com/live/P4oa6WJV1Uk?si=pVoySiD-eqb44x0p',
  },
  {
    id: 2,
    title: 'ABP News',
    coverUrl: 'https://www.medianews4u.com/wp-content/uploads/2017/10/repulic-with-R-logo-2.jpg',
    description: '',
    main: 'https://www.abplive.com/live-tv',
    youtube: 'https://www.youtube.com/live/OvoyHvUI1t0?si=1LNIhsVG50kx9pvX',
  },
];
 
const forward = (path) => {
  window.open(path, '_blank');
};
 
export default function OverviewAppNews() {
  const settings = useSettingsContext();
 
  const { user } = useAuthContext()
 
  const userState = user?.UserAddressesses?.[0]?.userState;
 
  const { allLocalNews } = useGetAllLocalNews(user?.accessToken)
 
  const filteredLocalNews = allLocalNews?.data?.filter(news => news.state === userState)
 
  const localNews = filteredLocalNews?.length > 0 ? filteredLocalNews?.[0]?.newsUrl : _carouselsExample3
  const nationalNews = filteredLocalNews?.length > 0 ? filteredLocalNews?.[0]?.newsOfficialChannelUrl : _carouselsExample4
 
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ marginTop: '40px', mb: 10 }}>
      {/* <Typography variant="h4" sx={{ marginBottom: '40px' }}>
        Trending On ATTPL News Today
      </Typography> */}
      <Grid container gap={8} sx={{ width: '100%' }}>
        <Grid xs={12} md={5.3}>
          {/* <Typography variant="h4" sx={{ mb: 1.5, textWrap:'nowrap' }}>Solve Common Problem in Your Area By ATTPL</Typography> */}
          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                display: 'inline-block',
                animation: `${moveText} 15s linear infinite`,
              }}
            >
              Solve Common Problem in Your Area By ATTPL
            </Typography>
          </Box>
          <CarouselAnimation data={_carouselsExample} btn="false" />
        </Grid>
 
        <Grid xs={12} md={5.3}>
          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* <Typography variant="h4" sx={{ mb: 1.5 }}>Candidates in the Election</Typography> */}
            <Typography
              variant="h4"
              sx={{
                display: 'inline-block',
                animation: `${moveText} 15s linear infinite`,
              }}
            >
              Candidates in the Election
            </Typography>
          </Box>
          <CarouselAnimation data={_carouselsExample2} btn="true" />
        </Grid>
 
        {/* <Grid xs={12} md={5.3}>
          <Typography variant="h4" sx={{mb: 1.5}}>Local News</Typography>
          <LazyLoadComponent height={200} offset={100} once>
          <CarouselAnimation data={_carouselsExample3} btn="true" />
          </LazyLoadComponent>
        </Grid> */}
        <Grid container spacing={3}>
          {/* Local News */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}
          >
            <Typography variant="h4" sx={{ mb: 1.5 }}>
              Local News
            </Typography>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              {localNews?.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{
                    borderRadius: '10px',
                    height: { xs: '200px', sm: '400px', md: '150px' },
                    width: { xs: '100%', sm: '100%', md: '240px' },
                    position: 'relative',
                  }}
                >
                  <ReactPlayer url={item.youtube} width="100%" height="100%" playing loop muted />
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      margin: '16px',
                    }}
                    color="primary"
                    onClick={() => forward(item.main)}
                  >
                    View
                  </Button>
                </Grid>
              ))
              }
            </Grid>
          </Grid>
          {/* National News */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}
          >
            <Typography variant="h4" sx={{ mb: 1.5 }}>
              National News
            </Typography>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              {
                nationalNews?.map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    key={index}
                    sx={{
                      borderRadius: '10px',
                      height: { xs: '200px', sm: '400px', md: '150px' },
                      width: { xs: '100%', sm: '100%', md: '240px' },
                      position: 'relative',
                    }}
                  >
                    <ReactPlayer url={item.youtube} width="100%" height="100%" playing loop muted />
                    <Button
                      variant="contained"
                      sx={{
                        position: 'absolute', // Position absolute for the button
                        bottom: 0,
                        left: 0,
                        margin: '16px', // Adjust margin as needed
                      }}
                      color="primary"
                      onClick={() => forward(item.main)}
                    >
                      View
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
 
        {/* <Grid xs={12} md={5.3} >
          <Typography variant="h4" sx={{ mb: 1.5 }}>National News</Typography>
          <LazyLoadComponent height={200} offset={100} once>
            <CarouselAnimation data={_carouselsExample4} btn="true" />
          </LazyLoadComponent>
        </Grid> */}
      </Grid>
    </Container>
  );
}