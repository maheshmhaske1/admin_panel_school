import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

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
  addOrganization,
  deleteOrganizationData,
  editOrganization,
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link } from "react-router-dom";
import UploadImage from "../ownComponent/UploadImage";


function Organization() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [btnText, setBtnText] = useState("Add Organization");
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  //imgUpload
  const [imageUrl, setImageUrl] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    is_type: null,
    is_type_value: null,
    logo_url: "",
  });

  useEffect(() => {
    renderData();
  }, []);

  const [typeOptions] = useState([
    { value: "school", label: "School" },
    { value: "institute", label: "Institute" },
  ]);

  // render data
  const renderData = async () => {
    const response = await renderOrganizationData();
    console.log(response);
    if (response.success) {
      setData(response.data);
    } else {
      // Handle error if needed
    }
  };

  //edit organization
  const handleEdit = (id) => {
    setBtnText("Update Organization");
    const organizationToUpdate = data.find((org) => org._id === id);
    console.log(organizationToUpdate)
    setEditId(organizationToUpdate._id);
    //imgUpload
    setImageUrl(organizationToUpdate.logo_url)
    setFormData({
      name: organizationToUpdate.name,
      email: organizationToUpdate.email,
      mobile_number: organizationToUpdate.mobile_number,
      address: organizationToUpdate.address,
      is_type_value: {
        value: organizationToUpdate.is_type,
        label: organizationToUpdate.is_type,
      },
      is_type: organizationToUpdate.is_type,
      logo_url: "",
    });
  };

  // Delete organization
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this organization!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });


    if (confirmDelete.isConfirmed) {
      try {
        const response = await deleteOrganizationData(id);
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

  //imgUpload
  const handleUpload = (url) => {
    setImageUrl(url);
  };

  const columns = [
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

    const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = formRef.current;

      if (form.checkValidity() === false) {
        form.classList.add("was-validated");
        if (formData.is_type == "" || formData.is_type == null) {
          setIsTypeSelected(true);
          return;
        }
        return;
      }

      let response = null;
      console.log("imageUrl",imageUrl)
      // imgUpload
      formData.logo_url = imageUrl
      console.log(formData);
      if (editId) {
        response = await editOrganization(editId, formData);
      } else {
        response = await addOrganization(formData);
        setEditId(null);
      }

      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        renderData();

        setBtnText("Add Organization");
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          address: "",
          is_type_value: null,
          is_type: null,
          logo_url:""
        });
      
        //imgUpload
        setImageUrl('');
        // Reset file input
        const inputElement = document.getElementById('fileInput');
        if (inputElement) {
          inputElement.value = '';
        }
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
          <CFormLabel>Address</CFormLabel>
          <CFormInput
            type="text"
            name="address"
            placeholder="Enter Address"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <CFormFeedback invalid>Please enter address.</CFormFeedback>
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
          <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}> {isTypeSelected ? "Please select type" : ""}</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel> Logo</CFormLabel>
          <UploadImage onUpload={handleUpload} img={imageUrl} />
          <CFormFeedback invalid>
            Example invalid form file feedback
          </CFormFeedback>

        </CCol>
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
      <FormsCustom customStyles={CustomStyles} title="Organization Master" />
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default Organization;

Organization.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      _id: PropTypes.number.isRequired,
    }),
  }),
};
