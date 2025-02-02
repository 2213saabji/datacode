/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import './VendorCreatePage.css'; // Import your CSS file for styling
import { useGetSoilType } from 'src/api/farmer';

export default function VendorCreatePage() {
  const soil = useGetSoilType();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const soilTypes = useGetSoilType(selectedCategory);
  console.log({ soilTypes });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedJob('');
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  return (
    <>
      <Helmet>{/* <title>Dashboard: Create a new student</title> */}</Helmet>
      <div className="container">
        <div className="form-container">
          <h1>Farmer Roadmap</h1>
          <div className="form-group">
            {/* <label htmlFor="category">Select Category:</label> */}
            <select
              id="category"
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {soil.posts.map((item) => (
                <option key={item?.id} value={item?.soilType}>
                  {item?.soilType}
                </option>
              ))}
            </select>
          </div>

          {/* {selectedCategory && (
            <div className="form-group">
              <select
                id="job"
                className="form-control"
                value={selectedJob}
                onChange={handleJobChange}
              >
                <option value="">Select Job</option>
                {jobs.posts.map((job) => (
                  <option key={job} value={job?.jobName}>
                    {job?.jobName}
                  </option>
                ))}
              </select>
            </div>
          )} */}

          {/* {selectedJob && (
            <div className="job-details">
              <h2>{selectedJob}</h2>
              <p>Additional fields for {selectedJob} go here...</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
