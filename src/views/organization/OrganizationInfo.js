import React, { useState, useEffect } from 'react';
import DataTable from '../ownComponent/DataTable';
import { CButton } from '@coreui/react';
import {
  renderExamDataByOrganization,
  renderOrganizationById,
  renderOrganizationData,
  renderStudentDataByOrganization,
  renderTeacherByOrganization,
} from 'src/utility/api';
import { useParams } from 'react-router-dom';
import Student from '../student/Student';
import Teacher from '../teacher/Teacher';
import Exam from '../exam/Exam';


function OrganizationInfo() {

  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState('teacher');
  const [organizationName, setOrganizationName] = useState('Organization Name');
  
  useEffect(() => {
    const fetchData = async () => {
      const organization = await renderOrganizationById(id);
      console.log("organization", organization)
      setOrganizationName(organization.data.name);
    };
    fetchData();
  })

  return (
    <div>
      <div className='container bg-white mb-3 p-3'>
        <div className='row'>
          <div className='col-12'>
            <h5>{organizationName}</h5>
            <hr></hr>
          </div>
          <div className='col-2'>
            <a
              onClick={() => setSelectedOption('teacher')}
              className={`custom_button ${selectedOption === 'teacher' ? 'custom_button_active' : ''}`}
            >
              Teacher Info
            </a>
          </div>
          <div className='col-2'>
            <a
              onClick={() => setSelectedOption('student')}
              className={`custom_button ${selectedOption === 'student' ? 'custom_button_active' : ''}`}
            >
              Student Info
            </a>
          </div>
          <div className='col-2'>
            <a
              onClick={() => setSelectedOption('exam')}
              className={`custom_button ${selectedOption === 'exam' ? 'custom_button_active' : ''}`}
            >
              Examination Info
            </a>
          </div>
        </div>
      </div>
      {
        selectedOption === 'student' ? <Student id={id} /> :
        selectedOption === 'teacher' ? <Teacher id={id} /> :
        selectedOption === 'exam' ? <Exam id={id} /> :
        null
      }
    </div>
  );
}

export default OrganizationInfo;

