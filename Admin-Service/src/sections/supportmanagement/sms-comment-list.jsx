import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useParams } from 'src/routes/hooks';

import SmsCommentItem from './sms-comment-item';

export default function SmsCommentList({ comments }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2); // Set your desired page size here
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const filteredComments = comments.filter((comment) => comment.issue_id === parseInt(id, 10));
    setData(filteredComments);
  }, [comments, id]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {data.slice((page - 1) * pageSize, page * pageSize).map((comment, i) => {
        const { remark_description, remark_updated_by, created_at } = comment;

        return (
          <Box key={i}>
            <SmsCommentItem
              remark_description={remark_description}
              remark_updated_by={remark_updated_by}
              created_at={created_at}
            />
          </Box>
        );
      })}
      {data.length > pageSize && (
        <Pagination
          count={Math.ceil(data.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

SmsCommentList.propTypes = {
  comments: PropTypes.array,
};

// import PropTypes from 'prop-types';
// import{useState,useEffect} from 'react'
// import Box from '@mui/material/Box';
// import Pagination, { paginationClasses } from '@mui/material/Pagination';
// import { useParams } from 'src/routes/hooks';
// import SmsCommentItem from './sms-comment-item';

// // ----------------------------------------------------------------------

// export default function SmsCommentList({ comments }) {
//   const [data,setData]=useState([])
//     const params = useParams();

//     const { id } = params;
//     useEffect(() => {
//         const filteredComments = comments.filter(comment => comment.issue_id === parseInt(id,10));
//         // const filteredComments = comments.filter(comment => comment.issue_id === id);

//         setData(filteredComments);
//     }, [comments, id]);

//   return (
//     <>
//       <>
//         {data.map((comment,i) => {
//           const { remark_description,remark_updated_by,created_at,issue_id } = comment;

//           return (
//             <Box key={i}>
//               <SmsCommentItem
//                remark_description={ remark_description}
//                remark_updated_by ={remark_updated_by}
//                created_at={created_at}
//               />

//             </Box>
//           );
//         })}
//       </>
//       {data.length > 2&& (
//         <Pagination
//           count={Math.floor(data.length / 2)}
//           sx={{
//             mt: 8,
//             [`& .${paginationClasses.ul}`]: {
//               justifyContent: 'center',
//             },
//           }}
//         />
//       )}
//       {/* <Pagination count={8} sx={{ my: 5, mx: 'auto' }} /> */}
//     </>
//   );
// }

// SmsCommentList.propTypes = {
//   comments: PropTypes.array,
// };
