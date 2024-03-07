import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Cookies from 'js-cookie'
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormCheck,
} from "@coreui/react";
import DataTable from "../ownComponent/DataTable";
import FormsCustom from "../ownComponent/FormsCustom";
import {
    renderQuestionData,
    addQuestion,
    editQuestion,
    deleteOrganizationData,
    deleteQuestionData
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";
import { useParams } from "react-router-dom";
import UploadImage from "../ownComponent/UploadImage";
import ExcelUploadComponent from './ExcelUploadComponent';



function Question() {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [btnText, setBtnText] = useState("Add Question");
    const [LevelName, setLevelName] = useState("");
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [options, setOptions] = useState([]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [isFinal, setIsFinal] = useState(false);
    const [isBulk, setIsBulk] = useState(false);
   

    //imgUpload
    const [imageUrl, setImageUrl] = useState('');


    const { id } = useParams();
    const created_by = Cookies.get('adminId')



    const [formData, setFormData] = useState({
        question: "",
        img_url: "",
        is_type: null,
        is_type_value: null,
        answer: "Test",
        level_id: id,
        created_by: created_by,
        options: [],
        is_final: false,
    });

    useEffect(() => {
        renderData();
    }, []);

    const [typeOptions] = useState([
        { value: "Geography", label: "Geography" },
        { value: "Math", label: "Math" },
    ]);

    const renderData = async () => {
        const response = await renderQuestionData(id);
        console.log(response);
        if (response.success) {
            setData(response.data);
            setLevelName(response.data.length > 0 ? response.data[0].level_id.name : "")
        } else {
            // Handle error if needed
        }
    };

    const handleEdit = (id) => {
        setBtnText("Update Question");
        const levelToUpdate = data.find((org) => org._id === id);
        console.log(levelToUpdate);
        setEditId(levelToUpdate._id);
        setOptions([])

        levelToUpdate.options.map((option, index) => {
            setOptions((prevOptions) => [...prevOptions, { name: option.name, is_true: option.is_true }]);
            if (option.is_true) {

                setCorrectOptionIndex(index);
            }
        })

        setIsFinal(levelToUpdate.is_final)
        //imgUpload
        setImageUrl(levelToUpdate.img_url)


        setFormData({
            question: levelToUpdate.question,
            img_url: levelToUpdate.img_url,
            is_type: levelToUpdate.is_type,
            is_type_value: { value: levelToUpdate.is_type, label: levelToUpdate.is_type },
            is_final: levelToUpdate.is_final,

        });
    };

    const updateIsBulkState = (newValue) => {
        setIsBulk(false)
    };


    //imgUpload
    const handleUpload = (url) => {
        setImageUrl(url);
    };


    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this question!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await deleteQuestionData(id);
                console.log("response", response)
                if (response.success) {
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    renderData();
                } else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log("error", error)
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    };

    const columns = [
        {
            Header: "Level Name", accessor: "level_id",
            Cell: ({ row }) => (
                <>{row.original.level_id ? row.original.level_id.name : "-"}</>
            ),
        },
        { Header: "Question", accessor: "question" },
        { Header: "Type", accessor: "is_type" },
        {
            Header: "Options", accessor: "options",
            Cell: ({ row }) => (
                <>{row.original.options ? row.original.options.length : "-"}</>
            ),
        },
        {
            Header: "Is Final", accessor: "is_final",
            Cell: ({ row }) => (
                <>{row.original.is_final ? "Yes" : "No"}</>
            ),
        },
        {
            Header: "Created By", accessor: "created_by",
            Cell: ({ row }) => (
                <>{row.original.created_by ? row.original.created_by.admin_name : "-"}</>
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

        const handleAddOption = () => {
            setOptions((prevOptions) => [...prevOptions, { name: "", is_true: false }]);
        };

        const handleOptionChange = (index, fieldName, value) => {
            setOptions((prevOptions) => {
                const updatedOptions = [...prevOptions];
                updatedOptions[index][fieldName] = value;
                return updatedOptions;
            });
        };

        const handleRemoveOption = (index) => {
            setOptions((prevOptions) => {
                const updatedOptions = [...prevOptions];
                updatedOptions.splice(index, 1);
                return updatedOptions;
            });

            // Adjust correctOptionIndex when removing an option
            if (index === correctOptionIndex) {
                setCorrectOptionIndex(null);
            } else if (index < correctOptionIndex) {
                setCorrectOptionIndex(correctOptionIndex - 1);
            }
        };

        const handleSetCorrectOption = (index) => {
            setCorrectOptionIndex(index);
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
        
            // Check if a correct option is selected
            if (correctOptionIndex === null) {
                toast.error("Please select the correct answer option", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return;
            }
        
            // Set the is_true field for the correct option
            const updatedOptions = options.map((opt, index) => ({
                ...opt,
                is_true: index === correctOptionIndex,
            }));
        
            formData.is_final = isFinal;
            // imgUpload
            formData.img_url = imageUrl
            setOptions(updatedOptions);
        
            console.log("updatedOptions", updatedOptions)
            console.log("formData", formData)
            // return
            let response = null;
        
            if (editId) {
                response = await editQuestion(editId, { ...formData, options: updatedOptions });
            } else {
                response = await addQuestion({ ...formData, options: updatedOptions });
                setEditId(null);
            }
        
            if (response.success) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                renderData();
        
                setBtnText("Add Question");
                setFormData({
                    question: "",
                    img_url: "",
                    is_type: null,
                    is_type_value: null,
                    answer: "Test",
                    level_id: id,
                    created_by: created_by,
                    options: [],
                    is_final: false,
                });
                //imgUpload
                setImageUrl('');
        
                setOptions([]); // Clear options state
                setCorrectOptionIndex(null); // Reset correctOptionIndex
                setIsFinal(false);
        
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
                <CCol md={6}>
                    <CFormLabel>Question</CFormLabel>
                    <CFormInput
                        type="text"
                        placeholder="Enter Question"
                        name="question"
                        required
                        value={formData.question}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter question name</CFormFeedback>
                </CCol>
                <CCol md={3}>
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
                        {isTypeSelected ? "Please select type" : ""}
                    </CFormFeedback>
                </CCol>

                <CCol md={3}>
                    <CFormLabel> Question Image</CFormLabel>
                    <UploadImage onUpload={handleUpload} img={imageUrl} />
                    <CFormFeedback invalid>
                        Example invalid form file feedback
                    </CFormFeedback>

                </CCol>

                <CCol md={3}>
                    <CFormCheck
                        type="checkbox"
                        id="is_final_checkbox"
                        label="Is Final"
                        checked={isFinal}
                        onChange={(e) => setIsFinal(e.target.checked)}
                    />
                </CCol>

                <CCol xs={12} className="d-flex justify-content-start">
                    <CButton color="info" style={{ color: "white" }} onClick={handleAddOption}>
                        Add Option
                    </CButton>
                </CCol>



                {options.map((option, index) => (
                    <React.Fragment key={index}>
                        <CCol md={7}>
                            <CFormLabel>{`Option ${index + 1}`}</CFormLabel>
                            <CFormInput
                                type="text"
                                placeholder={`Enter Option ${index + 1}`}
                                name={`option_${index}`}
                                value={option.name}
                                onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                            />
                        </CCol>
                        <CCol md={2} className="mt-5">
                            <CFormLabel className="mx-2">Is Correct?</CFormLabel>
                            <CFormCheck
                                type="checkbox"
                                name={`is_correct_${index}`}
                                checked={index === correctOptionIndex}
                                onChange={() => handleSetCorrectOption(index)}
                            />
                        </CCol>
                        <CCol md={3} className="mt-5">
                            <CButton
                                color="danger"
                                style={{ color: "white" }}
                                onClick={() => handleRemoveOption(index)}
                            >
                                Remove
                            </CButton>
                        </CCol>
                    </React.Fragment>
                ))}

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
            <div className="row my-2">
                <div className="col-12 text-end" >
                <CButton color="primary" type="submit" onClick={() => setIsBulk(true)}>
                     <FaPlus></FaPlus> Bulk Upload
                    </CButton>
                </div>
            </div>
            <FormsCustom customStyles={CustomStyles} title={`Question Master (${LevelName})`} />
            {isBulk?<ExcelUploadComponent created_by={created_by} id={id} isBulk={isBulk}   updateIsBulkState={updateIsBulkState} renderData={renderData} />:""}
            
            <DataTable columns={columns} data={data} />
        </>
    );
}

export default Question;

Question.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            _id: PropTypes.number.isRequired,
        }),
    }),
};
