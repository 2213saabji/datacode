// // AnnouncementButton.js
// import React from 'react';
// import PropTypes from 'prop-types';
// import styled, { keyframes } from 'styled-components';
// import { FaBullhorn } from 'react-icons/fa';

// // Keyframes for animation
// const pulse = keyframes`
//   0% {
//     box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
//   }
//   70% {
//     box-shadow: 0 0 20px 20px rgba(255, 0, 0, 0);
//   }
//   100% {
//     box-shadow: 0 0 20px 20px rgba(255, 0, 0, 0);
//   }
// `;

// const ButtonText = styled.span`
//   @media (max-width: 1024px) {
//     display: none;
//   }
// `;

// const ButtonIcon = styled(FaBullhorn)`
//   font-size: 22px;
//   margin-right: 10px;

//   @media (max-width: 1024px) {
//     display: inline-block;
//     font-size: 22px;
//     color: #3a8ff3;
//     margin-right: 0px;
//   }
// `;

// const Button = styled.button`
//   background-color: #3a8ff3;
//   color: white;
//   border: blue;
//   padding: 10px 20px;
//   font-size: 15px;
//   font-weight: 700;
//   cursor: pointer;
//   border-radius: 5px;
//   animation: ${pulse} 2s infinite;
//   display: flex;
//   align-items: center;

//   &:hover {
//     background-color: #3a8ff3;
//     color: white;
//   }

//   @media (max-width: 1024px) {
//     background: none;
//     padding: 10px;
//     box-shadow: none;
//   }
// `;

// const AnnouncementButton = ({ handleClick }) => (
//   <Button onClick={handleClick}>
//     <ButtonIcon />
//     <ButtonText>EMS LAUNCH EVENT</ButtonText>
//   </Button>
// );

// AnnouncementButton.propTypes = {
//   handleClick: PropTypes.func.isRequired,
// };

// export default AnnouncementButton;
