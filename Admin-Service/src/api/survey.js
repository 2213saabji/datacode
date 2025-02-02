import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { poster, fetcher, endpoints } from 'src/utils/axios-survey';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

export async function CreateSurvey(data, user) {
  try {
    const URL = endpoints.survey.create;
    const accessToken = sessionStorage.getItem('accessToken');

    const header = { headers: { Authorization: `Bearer ${accessToken}` } };

    const {
      // surveyName,
      // surveyDescription,
      // surveyStatus,
      // surveyTitle,
      surveyQuestions,
      // userId,
      // startTime,
      // endTime,
      // userIdsForSurvey
    } = data;

    // const dataCreateSurvey = {
    //   surveyName,
    //   surveyDescription,
    //   surveyStatus,
    //   surveyTitle,
    //   userId,
    //   startTime,
    //   endTime,
    //   userIdsForSurvey
    // };

    const response = await poster(URL, data, header);
    console.log(response);

    if (surveyQuestions.length > 0 && response.data.surveyId) {
      const questionAdd = surveyQuestions.map((item) => {
        const questionUrl = `${endpoints.survey.addQuestion}/${response.data.surveyId}/questions`;
        const dataAddQuestion = {
          ...item,
          userId: user,
          numberOfQuestionOption: item.options.length,
        };
        console.log(dataAddQuestion);
        // Return the promise returned by the `poster` function
        return poster(questionUrl, dataAddQuestion, header);
      });

      const result = await Promise.all(questionAdd);
      console.log('Results:', result);
      if (result) {
        const allSuccessful = result.every((item) => item.success);
        console.log(allSuccessful);
        if (!allSuccessful) {
          console.error('Some API calls for adding question were not successful');
        } else {
          return allSuccessful;
        }
      }
    }
  } catch (error) {
    console.error('Error creating Survey:', error);
  }
}

export async function FillSurvey(data) {
  try {
    const URL = `${endpoints.survey.addQuestion}/${response.data.surveyId}/response`;
    const accessToken = sessionStorage.getItem('accessToken');

    const header = { headers: { Authorization: `Bearer ${accessToken}` } };

    const { responses, userId } = data;

    const dataFillSurvey = {
      responses,
      userId,
    };

    const response = await poster(URL, dataFillSurvey, header);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error Filling Survey:', error);
  }
}

export function useGetAllSurvey() {
  const URL = endpoints.survey.getAll;
  // const accessToken = sessionStorage.getItem("accessToken");

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      survey: data?.data || [],
      surveyLoading: isLoading,
      surveyError: error,
      surveyValidating: isValidating,
      surveyEmpty: !isLoading && !data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export async function AddSurveyResponse(id, data) {
  try {
    const URL = `${endpoints.survey.addResponse}/${id}/responses`;
    const accessToken = sessionStorage.getItem('accessToken');

    const response = await poster(URL, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error creating Survey response:', error);
  }
}

export async function AddSurveyQuestion(surveyId, data) {
  try {
    const URL = endpoints.survey.addQuestion`/${surveyId}/questions`;
    const accessToken = sessionStorage.getItem('accessToken');

    const response = await poster(URL, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error creating Survey response:', error);
  }
}

export function useGetSurveyResponse(surveyId) {
  const URL = surveyId ? `${endpoints.survey.surveys}/${surveyId}` : null;
  // const accessToken = sessionStorage.getItem("accessToken");
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      survey: data || {},
      surveyLoading: isLoading,
      surveyError: error,
      surveyValidating: isValidating,
      surveyEmpty: !isLoading && !data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}

// Api call for Survey Update

export async function UpdateSurvey(serveyId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.survey.update}/${serveyId}`;
  console.log('URL------>', URL);
  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}

// Api call for Question Update

export async function UpdateQuestion(questionId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.survey.updateQuestion}/${questionId}`;
  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}

// Api call for Survey Update

// export async function UpdateStatus(formData) {
//   const URL = `${ATTPL_EMS_HOST_API + endpoints.survey.updateStatus}`;
// // console.log('URL------>', URL)
//   try {
//     const response = await axios.put(URL, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error('Error Updating Survey:', error);
//     throw error;
//   }
// }

export async function UpdateStatus(data) {
  try {
    const URL = `${endpoints.survey.updateStatus}`;
    const accessToken = sessionStorage.getItem('accessToken');

    const response = await poster(URL, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error creating Survey response:', error);
  }
}

export function useGetAllSurveyResponsenses(accessToken, userId) {
  const URL = `${endpoints.survey.getAllResponses}/${userId}`;
  // const accessToken = sessionStorage.getItem("accessToken");

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      surveyResponse: data || [],
      surveyResponseLoading: isLoading,
      surveyResponseError: error,
      surveyResponseValidating: isValidating,
      surveyResponseEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
