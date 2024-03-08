import React, { useEffect, useState } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import DataTable from '../ownComponent/DataTable'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import { renderDataForDashboard } from 'src/utility/api';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const [data, setData] = useState([])
  const [examData, setExamData] = useState([])

  const [organizationData, setOrganizationData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [teacherData, setTeacherData] = useState([])


  const navigate = useNavigate()

  useEffect(() => {
    renderData()
  }, [])

  const renderData = async () => {
    const response = await renderDataForDashboard()
    if (response.success) {
      setData(response.data)
      setExamData(response.data.examData)
      setOrganizationData(response.data.orgData)
      setStudentData(response.data.studentData)
      setTeacherData(response.data.teacherData)

    }
  }

  // handleExamView
  const handleExamView = async (id) => {
    console.log(id)
    navigate(`/examination-info/${id}`);
  }

  //orgColumns
  const columnsOrg = [
    { Header: "Organization Name", accessor: "name" },
    { Header: " Email", accessor: "email" },
    { Header: " Mobile Number", accessor: "mobile_number" },
    { Header: " Address", accessor: "address" },
    { Header: " Type", accessor: "is_type" },
    {
      Header: "Actions",
      accessor: "_id", // Assuming you have an 'id' property in your organization data
      Cell: ({ row }) => (
        <>
          <Link to={`/organization-info/${row.original._id}`}>
            <CButton color="success" size="sm" style={{ color: "white" }}>
              <FaEye /> View
            </CButton>
          </Link>{" "}

        </>
      ),
    },
  ];

  //examColumns
  const examColumns = [
    { Header: "Exam Name", accessor: "exam_name" },
    { Header: "Level Name", accessor: "level_id.name" },
    { Header: "Organization Name", accessor: "organization_id.name" },
    { Header: "Incharge Teacher", accessor: "teacher_id.name" },
    { Header: "Exam Duration", accessor: "exam_duration" },
    { Header: "Total Marks", accessor: "total_marks" },
    {
      Header: "Exam Start Date & Time",
      accessor: "examDateTime",
      Cell: ({ value }) => {
        // Format the date
        const formattedDate = new Date(value).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        // Format the time
        const formattedTime = new Date(value).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      Header: "Exam End Date & Time",
      accessor: "examEndDateTime",
      Cell: ({ value }) => {
        // Format the date
        const formattedDate = new Date(value).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        // Format the time
        const formattedTime = new Date(value).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
      },
    },
    { Header: "Created By", accessor: "created_by.admin_name" },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }) => {
        // Format the date
        const formattedDate = new Date(value).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        // Format the time
        const formattedTime = new Date(value).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      Header: "Schedule",
      accessor: "is_schedule",
      Cell: ({ value }) => (
        <CButton
          color={value ? "success" : "danger"}
          size="sm"
          style={{ color: "white", borderRadius: "20px", minWidth: "110px" }} // Set a fixed width
        >
          {value ? "Schedule" : "Not Schedule"}
        </CButton>
      ),
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }) => {
        const startDate = new Date(row.original.examDateTime);
        const endDate = new Date(row.original.examEndDateTime);
        const currentDate = new Date();

        if (currentDate < startDate) {
          return "Upcoming.";
        } else if (currentDate >= startDate && currentDate <= endDate) {
          
          return "Ongoing.";
        } else {
          
          return "Completed.";
        }
      },
    },

    {
      Header: "Actions",
      accessor: "_id", // Assuming you have an 'id' property in your teacher data
      Cell: ({ row }) =>
      // (

      {

        return (
          <> <CButton
            color="success"
            size="sm"
            style={{ color: "white" }}
            onClick={() => handleExamView(row.original._id)}
          >
            <FaEye /> View Details
          </CButton>{" "}</>
        )
      }
    },
  ];

  //teacherColumns
  const teacherColumns = [
    { Header: "Organization Name", accessor: "organization_id.name" },
    { Header: "Teacher Name", accessor: "name" },
    { Header: "Teacher Email", accessor: "email" },
    { Header: "Teacher Mobile Number", accessor: "mobile_number" },
    { Header: "Role", accessor: "is_type" },
  ];

  //studentColumns
  const studentColumns = [
    { Header: "Student Name", accessor: "name" },
    { Header: "Mobile Number", accessor: "mobile_number" },
    { Header: "Email Address", accessor: "email" },
    { Header: "Role Number", accessor: "roll_no" },
    { Header: "Level Name", accessor: "level_id.name" },
    { Header: "Organization Name", accessor: "organization_id.name" },
    { Header: "Created Type", accessor: "created_type" },
    {
        Header: "Created By",
        Cell: ({ row }) => (
            <>{row.original.created_type == "Admin" ? row.original.admin_id?.admin_name : row.original.teacher_id?.name}</>
        )
    },
   
];
  return (
    <>
      <WidgetsDropdown data={data} />
      <br></br>
      <DataTable columns={columnsOrg} data={organizationData} name="Recent Organization" />
      <div className='row my-4'>
        <div className='col-md-6'>
          <DataTable columns={teacherColumns} data={teacherData} name="Recent Teacher" />
        </div>
        <div className='col-md-6 mt-md-0 mt-4'>
          <DataTable columns={studentColumns} data={studentData} name="Recent Student" />

        </div>
      </div>
      <DataTable columns={examColumns} data={examData} name="Recent Examination" />

    </>
  )
}

export default Dashboard
