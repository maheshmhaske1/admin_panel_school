import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
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

    renderLevelData,
    addLevel,
    deleteLevelData,
    editLevel,
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'
import UploadImage from "../ownComponent/UploadImage";




function Levels() {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [btnText, setBtnText] = useState("Add Levels");
    //imgUpload
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imgUrl: "",
    });

    useEffect(() => {
        renderData();
    }, []);



    // render data
    const renderData = async () => {
        const response = await renderLevelData();
        console.log(response);
        if (response.success) {
            setData(response.data);
        } else {
            // Handle error if needed
        }
    };

    //edit organization
    const handleEdit = (id) => {
        setBtnText("Update Level");
        const LevelToUpdate = data.find((org) => org._id === id);
        console.log(LevelToUpdate)
        setEditId(LevelToUpdate._id);
        //imgUpload
        setImageUrl(LevelToUpdate.imgUrl)
        setFormData({
            name: LevelToUpdate.name,
            description: LevelToUpdate.description,
            imgUrl: LevelToUpdate.imgUrl,
        });
    };


    // Delete organization
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this level!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await deleteLevelData(id);
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



    //handleQuestion
    const handleQuestion = async (id) => {
        console.log(id)
        navigate(`/questions/${id}`);
    }

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Description", accessor: "description" },
        {
            Header: "Status", accessor: "status",
            Cell: ({ row }) => (
                <>{row.original.status ? "Active" : "Inactive"}</>
            ),
        },
        {
            Header: "createdAt", accessor: "createdAt",
            Cell: ({ row }) => (
                <>{row.original.createdAt ? row.original.createdAt.slice(0, 10) : ""}</>
            ),
        },


        {
            Header: "Actions",
            accessor: "_id", // Assuming you have an 'id' property in your organization data
            Cell: ({ row }) => (
                <>
                    <CButton
                        color="success"
                        size="sm"
                        style={{ color: "white" }}
                        onClick={() => handleQuestion(row.original._id)}
                    >
                        <FaPlusCircle /> Question
                    </CButton>{" "}
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
            // imgUpload
            formData.imgUrl = imageUrl
            console.log(formData);
            if (editId) {
                response = await editLevel(editId, formData);
            } else {
                response = await addLevel(formData);
                setEditId(null);
            }

            if (response.success) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                renderData();

                setBtnText("Add Level");
                setFormData({
                    name: "",
                    description: "",
                    imgUrl: "",
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
                    <CFormLabel>Level Name</CFormLabel>
                    <CFormInput
                        type="text"
                        placeholder="Enter Level Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter level name</CFormFeedback>
                </CCol>
                <CCol md={4}>
                    <CFormLabel>Description</CFormLabel>
                    <CFormInput
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter description</CFormFeedback>
                </CCol>

                {/* imgUpload */}
                <CCol md={4}>
                    <CFormLabel> Level Logo</CFormLabel>
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

            <FormsCustom customStyles={CustomStyles} title="Level Master" />

            <DataTable columns={columns} data={data} />
        </>
    );
}

export default Levels;

Levels.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            _id: PropTypes.number.isRequired,
        }),
    }),
};
