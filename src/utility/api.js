import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:5000'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add the token to the headers if it exists in cookies
const setAuthorizationHeader = () => {
  const bearerToken = Cookies.get('accessToken')
  if (bearerToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`
  }
}

// Call this function to set the Authorization header
setAuthorizationHeader()

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/admin-login'
    }
    return Promise.reject(error);
  }
);


// --------loginUser-----------//
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/admin/login`, userData)
    if (response.data.success) {
      // set token
      const accessToken = response.data.data.token
      // set the access token in cookie
      Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict' })

      // set token
      const name = response.data.data.name
      // set the access token in cookie
      Cookies.set('name', name, { secure: true, sameSite: 'strict' })

      const id = response.data.data.id
      Cookies.set('adminId', id, { secure: true, sameSite: 'strict' })

      setAuthorizationHeader();
    }
    return response.data
  } catch (error) {
    console.log("error", error)
    throw error
  }
}

// --------renderOrganizationData-----------//
export const renderOrganizationData = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/organization`)
    return response.data
  } catch (error) {
    throw error
  }
}

// --------renderOrganizationById-----------//
export const renderOrganizationById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/organization/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// -------addOrganization-----------//
export const addOrganization = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/organization`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteOrganizationData--------
export const deleteOrganizationData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/organization/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editOrganization---------//
export const editOrganization = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/organization/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}


// renderTeacherData
export const renderTeacherData = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/teacher`)
    return response.data
  } catch (error) {
    throw error
  }
}

// renderTeacherByOrganization
export const renderTeacherByOrganization = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/teacher/by-organization/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// -------addTeacher-----------//
export const addTeacher = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/teacher`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteTeacherData--------
export const deleteTeacherData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/teacher/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editOrganization---------//
export const editTeacher = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/teacher/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}



// --------renderLevelData-----------//
export const renderLevelData = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/levels`)
    return response.data
  } catch (error) {
    throw error
  }
}

// -------addLevel-----------//
export const addLevel = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/levels`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteLevelData--------
export const deleteLevelData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/levels/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editLevel---------//
export const editLevel = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/levels/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}




// --------renderQuestionData-----------//
export const renderQuestionData = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/question/by_level/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// -------addQuestion-----------//
export const addQuestion = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/question`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteQuestionData--------
export const deleteQuestionData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/question/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editQuestion---------//
export const editQuestion = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/question/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}



// --------renderStudentData-----------//
export const renderStudentData = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/student`)
    return response.data
  } catch (error) {
    throw error
  }
}

// --------renderStudentDataByOrganization-----------//
export const renderStudentDataByOrganization = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/student/organization/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// -------addStudent-----------//
export const addStudent = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/student`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteStudentData--------
export const deleteStudentData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/student/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editQuestion---------//
export const editStudent = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/student/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}



// --------renderExamData-----------//
export const renderExamData = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam`)
    return response.data
  } catch (error) {
    throw error
  }
}

//renderExamDataById
export const renderExamDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//renderStudentExamData
export const renderStudentExamData = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/get-exam-student-by-exam-id/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//removedStudentExamData
export const removedStudentExamData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/exam/removed-student-from-exam/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//removedStudentExamData
export const removedQuestionExamData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/exam/removed-question-from-exam/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}


// -------addExam-----------//
export const addExam = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------deleteExamData--------
export const deleteExamData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/exam/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//------editExam---------//
export const editExam = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/exam/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// --------renderExamDataByOrganization-----------//
export const renderExamDataByOrganization = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/by-organization-id/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// --------renderExamQuestionData-----------//
export const renderExamQuestionData = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/get-exam-qestion-by-exam-id/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
//addStudentToExam
export const addStudentToExam = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam/add-exam-student`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//renderNotExitStudent
export const renderNotExitStudent = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam/organization-student-not-exit`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//renderNotExitStudent
export const renderNotExitQuestion= async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam/question-not-exit`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//addStudentToExam
export const addQuestionToExam = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam/add-exam-question`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// --------scheduleExam-----------//
export const scheduleExam = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/schedule-exam/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//--------renderStudentExamById------//
export const renderStudentExamById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam-submission/by-examination-id/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// updateStudentCertificate
export const updateStudentCertificate = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/exam/update-student-certificate`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// updateGenerateCertificate
export const updateGenerateCertificate = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/update-student-certificate-generate/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
// updateDataForDashboard
export const renderDataForDashboard = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/exam/recent/dashboard`)
    return response.data
  } catch (error) {
    throw error
  }
}

//UpdateExamData
export const uploadBulkQuestion = async ( data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/question/bulk`, data)
    return response.data
  } catch (error) {
    throw error
  }
}