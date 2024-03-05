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
    renderTeacherData,
    addStudent,
    editStudent,
    deleteStudentData,
    renderStudentData,
    renderLevelData,
    renderStudentDataByOrganization
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";
import Cookies from 'js-cookie'

function Student(props) {

    // all useState
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [btnText, setBtnText] = useState("Add Student");
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [isTypeSelectedOrganization, setIsTypeSelectedOrganization] = useState(false);
    const [isTypeSelectedLevel, setIsTypeSelectedLevel] = useState(false);
    const [organization_option, setOrganizationOption] = useState([]);
    const [level_option, setLevelOption] = useState([]);

    const created_by = Cookies.get('adminId')

    const [formData, setFormData] = useState({
        name: "",
        mobile_number: "",
        email:"",
        roll_no: null,
        organization_value: null,
        organization_id: null,
        level_value: null,
        level_id: null,
        created_type: "Admin",
        created_id: created_by
    });

    useEffect(() => {
        renderData();
        renderOrganization();
        renderLevel();
    }, []);




    // render data
    const renderData = async () => {
        if(props.id){
            const response = await renderStudentDataByOrganization(props.id);
            console.log(response);
            if (response.success) {
                setData(response.data);
            }
        }else{
            const response = await renderStudentData();
            console.log(response);
            if (response.success) {
                setData(response.data);
            }
        }
        
    };

    // render organization
    const renderOrganization = async () => {
        const response = await renderOrganizationData();
        console.log(response);
        if (response.success) {
            response.data.map((org) => {
                org.label = org.name;
                org.value = org._id;
            });
            setOrganizationOption(response.data);
        }
    };

    // render level
    const renderLevel = async () => {
        const response = await renderLevelData();
        console.log(response);
        if (response.success) {
            response.data.map((org) => {
                org.label = org.name;
                org.value = org._id;
            });
            setLevelOption(response.data);
        }
    };

    //edit Student
    const handleEdit = (id) => {
        setBtnText("Update Student");
        const StudentToUpdate = data.find((org) => org._id === id);
        setEditId(StudentToUpdate._id);
        setFormData({
            name: StudentToUpdate.name,
            mobile_number: StudentToUpdate.mobile_number,
            email: StudentToUpdate.email,
            roll_no: StudentToUpdate.roll_no,
            organization_value: {
                value: StudentToUpdate.organization_id._id,
                label: StudentToUpdate.organization_id.name,
            },
            organization_id: StudentToUpdate.organization_id._id,

            level_value: {
                value: StudentToUpdate.level_id._id,
                label: StudentToUpdate.level_id.name,
            },
            level_id: StudentToUpdate.level_id._id,
            created_type: "Admin",
            created_id: created_by

        });
    };

    // Delete Student
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
                const response = await deleteStudentData(id);
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


        const handleChangeSelectOrganization = (selectedOption) => {
            console.log(selectedOption);
            setFormData((prevData) => ({
                ...prevData,
                organization_value: selectedOption,
                organization_id: selectedOption.value,
            }));
            setIsTypeSelectedOrganization(false);
        };

        // handleChangeSelectLevel
        const handleChangeSelectLevel = (selectedOption) => {
            console.log(selectedOption);
            setFormData((prevData) => ({
                ...prevData,
                level_value: selectedOption,
                level_id: selectedOption.value,
            }));
            setIsTypeSelectedLevel(false);
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = formRef.current;

            if (form.checkValidity() === false) {
                form.classList.add("was-validated");
                if (formData.level_id == "" || formData.level_id == null) {
                    setIsTypeSelectedLevel(true);
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
            formData.roll_no = parseInt(formData.roll_no)
            props.id?formData.organization_id = props.id:null;
            console.log(formData);

            //   return
            if (editId) {
                response = await editStudent(editId, formData);
            } else {
                response = await addStudent(formData);
                setEditId(null);
            }

            if (response.success) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                renderData();

                setBtnText("Add Student");
                setFormData({
                    name: "",
                    mobile_number: "",
                    email:"",
                    roll_no: "",
                    organization_value: null,
                    organization_id: null,
                    level_value: null,
                    level_id: null,
                    created_type: "Admin",
                    created_id: created_by
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
                    <CFormLabel>Student Name</CFormLabel>
                    <CFormInput
                        type="text"
                        placeholder="Enter Student Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter studnet name</CFormFeedback>
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
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter email address</CFormFeedback>
                </CCol>
                <CCol md={4}>
                    <CFormLabel>Role Number</CFormLabel>
                    <CFormInput
                        type="number"
                        name="roll_no"
                        placeholder="Enter Roll Number"
                        required
                        value={formData.roll_no}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter roll number</CFormFeedback>
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

                <CCol md={4}>
                    <CFormLabel>Select Level</CFormLabel>
                    <Select
                        name="is_type"
                        value={formData.level_value}
                        options={level_option}
                        onChange={handleChangeSelectLevel}
                        placeholder="Select Level"
                        required
                    />
                    <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}>
                        {" "}
                        {isTypeSelectedLevel ? "Please select level" : ""}
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
            <FormsCustom customStyles={CustomStyles} title="Student Master" />
            <DataTable columns={columns} data={data} />
        </>
    );
}

export default Student;

Student.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            _id: PropTypes.number.isRequired,
        }),
    }),
};
