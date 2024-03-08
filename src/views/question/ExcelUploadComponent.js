import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Modal } from "react-bootstrap";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormCheck,
} from "@coreui/react";
import { FaDownload, FaFile } from 'react-icons/fa';
import Excel from "src/assets/QuestionUpload.xlsx"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { uploadBulkQuestion } from 'src/utility/api';


const ExcelUploadComponent = ({ created_by, id, isBulk, updateIsBulkState, renderData }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = excelData.map((row) => {
        const options = [];
        for (let i = 1; i <= 4; i++) {
          const optionName = row[`option_${i}_name`];
          let optionIsTrue = row[`option_${i}_is_true`] === 'TRUE';

          console.log(`Option ${i}: Name - ${optionName}, IsTrue - ${optionIsTrue}`);

          if (optionIsTrue === "TRUE") {
            optionIsTrue = true
          } else {
            optionIsTrue = false
          }
          if (!optionName) continue;

          options.push({
            name: optionName,
            is_true: optionIsTrue,
          });
        }

        let is_final = false
        if(row.is_final == "TRUE"){
          is_final = true
        }
        return {
          question: row.question,
          is_type: row.is_type,
          img_url: row.img_url || '',
          is_final: is_final,
          created_by: created_by,
          answer: "Test",
          level_id: id,
          options, // options array should contain all 4 options, even if some are empty
        };
      });


      setData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };
  const toggleModal = () => {
    updateIsBulkState()
  };

  const handleSubmit = async (e) => {

    
    try {
      e.preventDefault();

      if(data.length == 0){
        toast.error("Please upload file or add question in file...!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      const response = await uploadBulkQuestion(data)
      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
        });
        toggleModal();
        updateIsBulkState()
        renderData()

      } else {
        toast.error("Something went wrong...!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }


    } catch (err) {
      toast.error("Something went wrong...!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }

  };

  const downloadSampleExcel = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = Excel; // Update the path to your Excel file
    downloadLink.download = 'QuestionUpload.xlsx'; // Update the filename if needed
    downloadLink.click();
  };
  return (
    <div>
      <Modal show={modalOpen} onHide={toggleModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Bulk Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-8'>
              <CFormLabel htmlFor="exampleFormControlInput1">Bulk Upload</CFormLabel>
              <CFormInput type="file" aria-label="file example" onChange={handleFileUpload} />
            </div>
            <div className='col-md-4 mt-md-3 mt-0'>
              <Button variant="primary" onClick={handleSubmit} className='w-100 mt-3 bulk_upload_btn'>
                <FaFile></FaFile> Upload Data
              </Button>
            </div>


          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" style={{ color: "white" }} className='' onClick={downloadSampleExcel}>
            <FaDownload></FaDownload>  Download Sample xlsx
          </Button>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ExcelUploadComponent;
