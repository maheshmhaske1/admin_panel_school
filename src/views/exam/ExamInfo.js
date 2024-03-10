import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";
import DataTable from '../ownComponent/DataTable';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import { useParams } from 'react-router-dom';
import ExamWidget from './ExamWidget';
import { removedStudentExamData, renderExamDataById, renderExamQuestionData, renderStudentExamData, removedQuestionExamData, scheduleExam } from 'src/utility/api';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudent from './AddStudent';
import AddQuestion from './AddQuestion';
import ShowAnswerPapper from './ShowAnswerPapper';
import CertificateGenerator from './CertificateGenerator';
import CertificatePDFGenerator from './CertificatePDFGenerator';
import certificate from "src/assets/own_img/certificate.jpeg"

function ExamInfo() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [examQuestionData, setQuestionExamData] = useState([]);
  const [isExamDone, setIsExamDone] = useState(false);
  const [isExamSchedule, setIsExamSchedule] = useState(false);
  const [showAnswerModal, setAnswerModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentExamId, setStudentExamId] = useState(null);
  const [examDataForPrint, setExamDataForPrint] = useState({});
 



  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)
  const handleDownload = () => {
    setShowModal(false);
    // Handle the download logic here
  };



  useEffect(() => {
    renderExamData()
    renderData();
    renderQuestionData()

  }, []);

  // render data
  const renderData = async () => {
    const response = await renderStudentExamData(id);

    if (response.success) {
      setData(response.data);
    }

  };

  //renderExamData
  const renderExamData = async () => {
    const response = await renderExamDataById(id);
    if (response.success) {

      setExamData(response.data);

      setIsExamSchedule(response.data[0].is_schedule)

      //check done or not
      const startDate = new Date(response.data[0].examDateTime);
      const endDate = new Date(response.data[0].examEndDateTime);
      const currentDate = new Date();



      if (currentDate < startDate) {
        setIsExamDone(false);
      } else if (currentDate >= startDate && currentDate <= endDate) {
        // setIsExamDone(true);

      } else {
        setIsExamDone(true);
      }

     
    }

  };

  //renderQuestionData
  const renderQuestionData = async () => {
    const response = await renderExamQuestionData(id); (id);
    if (response.success) {
      setQuestionExamData(response.data);

      // setIsExamSchedule(examData[0].exam_id.is_schedule)


    }

  };

  // Delete Student From Exam
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await removedStudentExamData(id);
        if (response.success) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          renderData();
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  //handleQuestionDelete
  const handleQuestionDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await removedQuestionExamData(id);
        if (response.success) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          renderQuestionData();
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  //updateData
  const updateData = async () => {
    await renderData();
  };

  //updateQuestionData
  const updateQuestionData = async () => {
    await renderQuestionData();
  };

  //scheduleExam
  const scheduleExamFunction = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Schedule it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await scheduleExam(id);
        if (response.success) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          renderQuestionData();
          setIsExamSchedule(true)
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  }

  //downloadCertificate
  const downloadCertificate = (rowData) => {
   
    setExamDataForPrint(rowData)
    setIsCertificateModalOpen(true)
  }


  //viewAnswerPaper
  const viewAnswerPaper = (id) => {
   
    setStudentExamId(id)
    setIsModalOpen(true)
  }

  //closeModal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsCertificateModalOpen(false);
  };

  const columns = [
    { Header: "Student Name", accessor: "student_id.name" },
    { Header: "Mobile Number", accessor: "student_id.mobile_number" },
    { Header: "Role Number", accessor: "student_id.roll_no" },
    { Header: "Level Name", accessor: "exam_id.level_id.name" },
    { Header: "Organization Name", accessor: "exam_id.organization_id.name" },
    { Header: "Created Type", accessor: "student_id.created_type" },
    { Header: "Exam Marks", accessor: "exam_score", Cell: ({ value }) => (value) },
    { Header: "Exam Status", accessor: "is_completed", Cell: ({ value }) => (value ? "Completed" : "Not Attempted") },

    {
      Header: "Actions",
      accessor: "_id", // Assuming you have an 'id' property in your teacher data
      Cell: ({ row }) => (
        <>


          {!isExamDone ? <>
            <CButton
              color="danger"
              size="sm"
              style={{ color: "white" }}
              onClick={() => handleDelete(row.original._id)}
            >
              <FaTrash /> Delete
            </CButton>
          </> : <>

            {row.original.is_completed ? <>
              <CButton
                color="success"
                size="sm"
                style={{ color: "white" }}
                onClick={() => downloadCertificate(row.original)}
              >
                <FaEye></FaEye> View Certificate
              </CButton>
              <CButton
                color="primary"
                size="sm"
                style={{ color: "white", margin: "0 10px" }}
                onClick={() => viewAnswerPaper(row.original._id)}
              >
                <FaEye /> View Answer Paper
              </CButton></> : "-"}

          </>}
        </>
      ),
    },
  ];

  const columnsQuestion = [
    { Header: "Exam Name", accessor: "exam_id.exam_name" },
    { Header: "Question Name", accessor: "question_id.question" },
    { Header: "Question Type", accessor: "question_id.is_type" },
    {
      Header: "Actions",
      accessor: "_id", // Assuming you have an 'id' property in your teacher data
      Cell: ({ row }) => (
        <>
          {!isExamDone ? <>
            <CButton
              color="danger"
              size="sm"
              style={{ color: "white" }}
              onClick={() => handleQuestionDelete(row.original._id)}
            >
              <FaTrash /> Delete
            </CButton>
          </> : "-"}

        </>
      ),
    },
  ];




  return (
    <div>

      {!isExamSchedule ? <div className='row my-3'>
        <div className='col-6'>
          <h5>Examination Info</h5>
        </div>
        <div className='col-6 text-end'>
          <button className='btn btn-primary' onClick={scheduleExamFunction}> Schedule Exam  </button>
        </div>

      </div> : ""}

      {
        isExamDone ? <>
          <div className='row my-3'>
            <div className='col-12 text-center'>
              <h5 className='text-danger'>Examination Time End, Now You Can't Delete User And Question Info.
                Now You Able Download Certificate. Thank You. </h5>
            </div>
          </div>
        </> : ""
      }

      <ExamWidget data={examData}></ExamWidget>
      <AddStudent updateData={updateData} examData={examData} data={data} isExamDone={isExamDone} />
      <DataTable columns={columns} data={data} />
      <AddQuestion renderQuestionData={updateQuestionData} examData={examData} isExamDone={isExamDone} />
      <DataTable columns={columnsQuestion} data={examQuestionData} name="Exam Question Info" />
      {isModalOpen ? <ShowAnswerPapper showModal={isModalOpen} closeModal={closeModal} studentExamId={studentExamId} /> : ''}
      {isCertificateModalOpen ? <CertificateGenerator data={examDataForPrint} setIsCertificateModalOpen={setIsCertificateModalOpen} /> : ''}
   
    </div>
  );
}

export default ExamInfo;

