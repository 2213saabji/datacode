// import React, { useState } from 'react';

// function AddQuestion({ onAddQuestion }) {
//   const [questionDescription, setQuestionDescription] = useState('');
//   const [numberOfQuestionOption, setNumberOfQuestionOption] = useState(5);
//   const [options, setOptions] = useState(new Array(numberOfQuestionOption).fill(''));

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   const handleAddQuestion = () => {
//     onAddQuestion({ questionDescription, numberOfQuestionOption, options });
//     setQuestionDescription('');
//     setNumberOfQuestionOption(5);
//     setOptions(new Array(5).fill(''));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter question description"
//         value={questionDescription}
//         onChange={(e) => setQuestionDescription(e.target.value)}
//       />
//       <input
//         type="number"
//         value={numberOfQuestionOption}
//         onChange={(e) => setNumberOfQuestionOption(Number(e.target.value))}
//       />
//       {options.map((option, index) => (
//         <input
//           key={index}
//           type="text"
//           value={option}
//           onChange={(e) => handleOptionChange(index, e.target.value)}
//         />
//       ))}
//       <button onClick={handleAddQuestion}>Add Question</button>
//     </div>
//   );
// }

// export default AddQuestion;
