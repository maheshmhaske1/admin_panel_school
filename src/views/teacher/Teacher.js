import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import DataTable from "../ownComponent/DataTable";
import FormsCustom from "../ownComponent/FormsCustom";
import {
  renderOrganizationData,
  addTeacher,
  deleteTeacherData,
  editTeacher,
  renderTeacherData,
  renderExamDataByOrganization,
  renderTeacherByOrganization,
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";



function Teacher(props) {

  console.log("props", props)
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [btnText, setBtnText] = useState("Add Teacher");
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [isTypeSelectedOrganization, setIsTypeSelectedOrganization] = useState(false);
   

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    is_type: null,
    is_type_value: null,
    file: null,
    organization_value: null,
    organization_id: null,
  });

  useEffect(() => {
    renderOrganization();
    renderData();
  }, []);

  const [typeOptions] = useState([
    { value: "Principal", label: "Principal" },
    { value: "HOD", label: "HOD" },
    { value: "Teacher", label: "Teacher" },
  ]);

  const [organization_option, setOrganizationOption] = useState([]);

  // render data
  const renderData = async () => {
    if (props.id) {
      const response = await renderTeacherByOrganization(props.id);
      if (response.success) {
        setData(response.data);
      }
    } else {
      const response = await renderTeacherData();
      console.log(response);
      if (response.success) {
        setData(response.data);
      }
    }

  };

  // render teacher
  const renderOrganization = async () => {
    const response = await renderOrganizationData();
    console.log(response);
    if (response.success) {
      response.data.map((org) => {
        org.label = org.name;
        org.value = org._id;
      });
      setOrganizationOption(response.data)
    }
  };

  //edit teacher
  const handleEdit = (id) => {
    setBtnText("Update Teacher");
    const teacherToUpdate = data.find((org) => org._id === id);
    setEditId(teacherToUpdate._id);
    setFormData({
      name: teacherToUpdate.name,
      email: teacherToUpdate.email,
      mobile_number: teacherToUpdate.mobile_number,
      is_type_value: {
        value: teacherToUpdate.is_type,
        label: teacherToUpdate.is_type,
      },
      is_type: teacherToUpdate.is_type,
      organization_value: {
        value: teacherToUpdate.organization_id._id,
        label: teacherToUpdate.organization_id.name,
      },
      organization_id: teacherToUpdate.organization_id._id,
      file: null,
    });
  };

  // Delete teacher
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this teacher!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await deleteTeacherData(id);
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

  const columns = [
    { Header: "Organization Name", accessor: "organization_id.name" },
    { Header: "Teacher Name", accessor: "name" },
    { Header: "Teacher Email", accessor: "email" },
    { Header: "Teacher Mobile Number", accessor: "mobile_number" },
    { Header: "Role", accessor: "is_type" },
    {
      Header: "Actions",
      accessor: "_id", // Assuming you have an 'id' property in your teacher data
      Cell: ({ row }) => (
        <>
          <CButton
            color="info"
            size="sm"
            style={{ color: "white" }}
            onClick={() => handleEdit(row.original._id)}
          >
            <FaEdit /> Edit
          </CButton>{" "}
          <CButton
            color="danger"
            size="sm"
            style={{ color: "white" }}
            onClick={() => handleDelete(row.original._id)}
          >
            <FaTrash /> Delete
          </CButton>
        </>
      ),
    },
  ];
  const CustomStyles = () => {
    const formRef = useRef();

    const handleChange = (e) => {
      const { name, value, files } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "file" ? files[0] : value,
      }));
    };
    const handleChangeSelect = (selectedOption) => {
      console.log(selectedOption);
      setFormData((prevData) => ({
        ...prevData,
        is_type_value: selectedOption,
        is_type: selectedOption.value,
      }));
      setIsTypeSelected(false);
    };

    const handleChangeSelectOrganization = (selectedOption) => {
      console.log(selectedOption);
      setFormData((prevData) => ({
        ...prevData,
        organization_value: selectedOption,
        organization_id: selectedOption.value,
      }));
      setIsTypeSelectedOrganization(false);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = formRef.current;

      if (form.checkValidity() === false) {
        form.classList.add("was-validated");
        if (formData.is_type == "" || formData.is_type == null) {
          setIsTypeSelected(true);
          return;
        } else if (
          formData.organization_id == "" ||
          formData.organization_id == null
        ) {
          setIsTypeSelectedOrganization(true);
          return;
        }
        return;
      }

      let response = null;
      console.log(formData);
      props.id?formData.organization_id=props.id:null
      //   return
      if (editId) {
        response = await editTeacher(editId, formData);
      } else {
        response = await addTeacher(formData);
        setEditId(null);
      }

      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        renderData();

        setBtnText("Add Teacher");
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          address: "",
          is_type_value: null,
          is_type: null,
          file: null,
          organization_value: null,
          organization_id: null,
        });

        form.classList.remove("was-validated");
      } else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    };

    return (
      <CForm
        ref={formRef}
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <CCol md={4}>
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <CFormFeedback invalid>Please enter name</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <CFormFeedback invalid>Please enter email</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel>Mobile Number</CFormLabel>
          <CFormInput
            type="number"
            name="mobile_number"
            placeholder="Enter Mobile Number"
            required
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <CFormFeedback invalid>Please enter mobile number</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel>Select Type</CFormLabel>
          <Select
            name="is_type"
            value={formData.is_type_value}
            options={typeOptions}
            onChange={handleChangeSelect}
            placeholder="Select Type"
            required
          />
          <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}>
            {" "}
            {isTypeSelected ? "Please select type" : ""}
          </CFormFeedback>
        </CCol>
        {!props.id ? <CCol md={4}>
          <CFormLabel>Select Organization</CFormLabel>
          <Select
            name="is_type"
            value={formData.organization_value}
            options={organization_option}
            onChange={handleChangeSelectOrganization}
            placeholder="Select Type"
            required
          />
          <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}>
            {" "}
            {isTypeSelectedOrganization ? "Please select organization" : ""}
          </CFormFeedback>
        </CCol> : null}

        {/* <CCol md={4}>
          <CFormLabel>Upload Logo</CFormLabel>
          <CFormInput type="file" aria-label="file example" />
          <CFormFeedback invalid>
            Example invalid form file feedback
          </CFormFeedback>
        </CCol> */}
        <CCol xs={12} className="d-flex justify-content-end">
          <CButton color="primary" type="submit">
            {btnText}
          </CButton>
        </CCol>
      </CForm>
    );
  };

  return (
    <>
      <FormsCustom customStyles={CustomStyles} title="Teacher Master" />
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default Teacher;

Teacher.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      _id: PropTypes.number.isRequired,
    }),
  }),
};
