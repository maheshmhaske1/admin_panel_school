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
    renderTeacherData,
    addExam,
    editExam,
    deleteExamData,
    renderExamData,
    renderLevelData,
    renderTeacherByOrganization,
    renderExamDataByOrganization
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";
import Cookies from 'js-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'



function Exam(props) {

    // all useState
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [btnText, setBtnText] = useState("Add Examination");
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [isTypeSelectedOrganization, setIsTypeSelectedOrganization] = useState(false);
    const [isTypeSelectedLevel, setIsTypeSelectedLevel] = useState(false);
    const [organization_option, setOrganizationOption] = useState([]);
    const [level_option, setLevelOption] = useState([]);
    const [teacher_option, setTeacherOption] = useState([]);
    const [isTypeSelectedTeacher, setIsTypeSelectedTeacher] = useState(false);
    const [isTeacherDisabled, setIsTeacherDisabled] = useState(true);
    const [isOrgDisabled, setIsOrgDisabled] = useState(false);
    const [isExamDone, setIsExamDone] = useState(false);




    const navigate = useNavigate()
    const created_by = Cookies.get('adminId')

    const [formData, setFormData] = useState({
        exam_name: "",
        total_marks: "",
        level_id: "",
        created_by: created_by,
        organization_value: null,
        organization_id: props.id ? props.id : null,
        level_value: null,
        level_id: null,
        examDateTime: null,
        examEndDateTime: null,
        teacher_value: null,
        teacher_id: null,
        exam_duration: null,
        duration_value: null

    });

    useEffect(() => {
        renderData();
        renderOrganization();
        renderLevel();
    }, []);




    // render data
    const renderData = async () => {

        if (props.id) {
            const response = await renderExamDataByOrganization(props.id);
            if (response.success) {
                setData(response.data);
            }

            renderTeacherData(props.id)
            setIsTeacherDisabled(false)


        } else {
            const response = await renderExamData();
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
    const renderTeacherData = async (id) => {
        const response = await renderTeacherByOrganization(id);
        console.log(response);
        if (response.success) {
            response.data.map((org) => {
                org.label = org.name;
                org.value = org._id;
            });
            setTeacherOption(response.data);
        }
    }

    //edit Student
    const handleEdit = (id) => {
        setBtnText("Update Examination");
        const studentToUpdate = data.find((org) => org._id === id);
        console.log(studentToUpdate);

        // Extract date and time from examDateTime 
        const examDateTime = new Date(studentToUpdate.examDateTime);
        const examEndDateTime = new Date(studentToUpdate.examEndDateTime);


        setEditId(studentToUpdate._id);
        setIsTeacherDisabled(false);
        setIsOrgDisabled(true);
        setFormData({
            exam_name: studentToUpdate.exam_name,
            total_marks: studentToUpdate.total_marks,
            organization_value: {
                value: studentToUpdate.organization_id._id,
                label: studentToUpdate.organization_id.name,
            },
            organization_id: studentToUpdate.organization_id._id,
            level_value: {
                value: studentToUpdate.level_id._id,
                label: studentToUpdate.level_id.name,
            },
            level_id: studentToUpdate.level_id._id,
            duration_value: {
                value: studentToUpdate.exam_duration,
                label: studentToUpdate.exam_duration,
            },
            exam_duration: studentToUpdate.exam_duration,

            teacher_value: {
                value: studentToUpdate.teacher_id._id,
                label: studentToUpdate.teacher_id.name,
            },
            teacher_id: studentToUpdate.teacher_id._id,
            examDateTime: examDateTime,
            examEndDateTime: examEndDateTime
        });
    };


    // Delete Exam
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
                const response = await deleteExamData(id);
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

    // handleExamView
    const handleExamView = async (id) => {
        console.log(id)
        navigate(`/examination-info/${id}`);
    }

    const columns = [
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
                // const endDate = new Date(row.original.examEndDateTime);
                // const currentDate = new Date();

                // if (endDate > currentDate) {
                //     return "Upcoming";
                // } else if (endDate.getDate() === currentDate.getDate()) {
                //     setIsExamDone(true);
                //     return "Ongoing";
                // } else {
                //     setIsExamDone(true);
                //     return "Completed";
                // }



                const startDate = new Date(row.original.examDateTime);
                const endDate = new Date(row.original.examEndDateTime);
                const currentDate = new Date();

                if (currentDate < startDate) {
                    return "Upcoming.";
                } else if (currentDate >= startDate && currentDate <= endDate) {
                    setIsExamDone(true);
                    return "Ongoing.";
                } else {
                    setIsExamDone(true);
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
                // const startDate = new Date(row.original.examDateTime);
                // const endDate = new Date(row.original.examEndDateTime);
                // const currentDate = new Date();

                // if (currentDate < startDate) {
                //     return <>
                //         <CButton
                //             color="success"
                //             size="sm"
                //             style={{ color: "white" }}
                //             onClick={() => handleExamView(row.original._id)}
                //         >
                //             <FaEye /> View Details
                //         </CButton>{" "}
                //         <CButton
                //             color="info"
                //             size="sm"
                //             style={{ color: "white" }}
                //             onClick={() => handleEdit(row.original._id)}
                //         >
                //             <FaEdit /> Edit
                //         </CButton>{" "}
                //         <CButton
                //             color="danger"
                //             size="sm"
                //             style={{ color: "white" }}
                //             onClick={() => handleDelete(row.original._id)}
                //         >
                //             <FaTrash /> Delete
                //         </CButton>

                //     </>
                // } else if (currentDate >= startDate && currentDate <= endDate) {
                //     return <>
                //         <CButton
                //             color="success"
                //             size="sm"
                //             style={{ color: "white" }}
                //             onClick={() => handleExamView(row.original._id)}
                //         >
                //             <FaEye /> View Details
                //         </CButton>{" "}
                //     </>

                // } else {
                //     return <>
                //     <CButton
                //         color="success"
                //         size="sm"
                //         style={{ color: "white" }}
                //         onClick={() => handleExamView(row.original._id)}
                //     >
                //         <FaEye /> View Details
                //     </CButton>{" "}
                // </>
                // }

                const is_schedule = row.original.is_schedule
                if (is_schedule) {
                    return <>
                        <CButton
                            color="success"
                            size="sm"
                            style={{ color: "white" }}
                            onClick={() => handleExamView(row.original._id)}
                        >
                            <FaEye /> View Details
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
                } else {
                    return <>
                        <CButton
                            color="success"
                            size="sm"
                            style={{ color: "white" }}
                            onClick={() => handleExamView(row.original._id)}
                        >
                            <FaEye /> View Details
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
                }
            }
        },
    ];

    const CustomStyles = () => {
        const formRef = useRef();

        const handleChange = (e) => {
            const { name, value, files } = e.target;

            if (name === 'examDateTime' || name === 'examEndDateTime') {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: new Date(value),
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: name === "file" ? files[0] : value,
                }));
            }
        };



        const handleChangeSelectOrganization = (selectedOption) => {
            console.log(selectedOption);
            setFormData((prevData) => ({
                ...prevData,
                organization_value: selectedOption,
                organization_id: selectedOption.value,
            }));
            renderTeacherData(selectedOption.value)
            setIsTeacherDisabled(false)
            setIsTypeSelectedOrganization(false);
        };


        //handleChangeSelectTeacher
        const handleChangeSelectTeacher = (selectedOption) => {
            console.log(selectedOption);
            setFormData((prevData) => ({
                ...prevData,
                teacher_value: selectedOption,
                teacher_id: selectedOption.value,
            }));
            setIsTypeSelectedTeacher(false);
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

        // Handler for duration change
        const handleDurationChange = (selectedOption) => {
            console.log(selectedOption);
            setFormData((prevData) => ({
                ...prevData,
                duration_value: selectedOption,
                exam_duration: selectedOption.value,
            }));
            // setIsTypeSelectedLevel(false);
        };


        const handleStartDateChange = (date) => {
            setFormData((prevData) => ({ ...prevData, examDateTime: date }));
        };

        const handleEndDateChange = (date) => {
            setFormData((prevData) => ({ ...prevData, examEndDateTime: date }));
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
            // Convert examDateTime and examEndDateTime to Date objects
            formData.examDateTime = new Date(formData.examDateTime).toISOString();
            formData.examEndDateTime = new Date(formData.examEndDateTime).toISOString();


            let response = null;
            formData.total_marks = parseInt(formData.total_marks)
            console.log(formData);

            //   return
            if (editId) {
                response = await editExam(editId, formData);
            } else {
                response = await addExam(formData);
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
                    exam_name: "",
                    total_marks: "",
                    examDateTime: "",
                    examEndDateTime: "",
                    organization_value: null,
                    organization_id: null,
                    level_value: null,
                    level_id: null,
                    teacher_id: null,
                    teacher_value: null,
                    duration_value: null,
                    exam_duration: null,
                });

                form.classList.remove("was-validated");
                setIsOrgDisabled(false);
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
                    <CFormLabel>Examination Name</CFormLabel>
                    <CFormInput
                        type="text"
                        placeholder="Enter Examination Name"
                        name="exam_name"
                        required
                        value={formData.exam_name}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter examination  name</CFormFeedback>
                </CCol>
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

                {!props.id ? <CCol md={4}>
                    <CFormLabel>Select Organization</CFormLabel>
                    <Select
                        name="is_type"
                        value={formData.organization_value}
                        options={organization_option}
                        onChange={handleChangeSelectOrganization}
                        placeholder="Select Type"
                        isDisabled={isOrgDisabled}
                        required
                    />
                    <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}>
                        {" "}
                        {isTypeSelectedOrganization ? "Please select organization" : ""}
                    </CFormFeedback>
                </CCol> : null}


                <CCol md={4}>
                    <CFormLabel>Select Incharge Teacher</CFormLabel>
                    <Select
                        name="teacher_id"
                        value={formData.teacher_value}
                        options={teacher_option}
                        onChange={handleChangeSelectTeacher}
                        placeholder="Select Teacher"
                        required
                        isDisabled={isTeacherDisabled}
                    />
                    <CFormFeedback className="text-danger" style={{ fontSize: "14px" }}>
                        {" "}
                        {isTypeSelectedTeacher ? "Please select teacher" : ""}
                    </CFormFeedback>
                </CCol>

                <CCol md={4}>
                    <CFormLabel>Select Examination Start Date and Time</CFormLabel>
                    <div className="d-flex">
                        <DatePicker
                            selected={formData.examDateTime}
                            onChange={handleStartDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            placeholderText="Select Examination Date and Time"
                            className="form-control"
                            required
                            minDate={new Date()} // Set minimum date to today
                            filterDate={(date) => {
                                const currentDate = new Date();
                                return date >= currentDate.setHours(0, 0, 0, 0); // Set current date to midnight
                            }}
                        />
                    </div>
                    <CFormFeedback invalid>Please select examination date and time</CFormFeedback>
                </CCol>

                <CCol md={4}>
                    <CFormLabel>Select Examination End Date and Time</CFormLabel>
                    <div className="d-flex">
                        <DatePicker
                            selected={formData.examEndDateTime}
                            onChange={handleEndDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            placeholderText="Select Examination Date and Time"
                            className="form-control"
                            required
                            minDate={formData.examDateTime} // Set minimum date to selected start date
                            filterDate={(date) => {
                                const currentDate = new Date();
                                return date >= currentDate.setHours(0, 0, 0, 0); // Set current date to midnight
                            }}
                            filterTime={(time) => {
                                const currentStartDate = formData.examDateTime || new Date();
                                const selectedEndDate = formData.examEndDateTime || currentStartDate;

                                // Check if the selected date is the same as the start date
                                if (selectedEndDate.getDate() === currentStartDate.getDate() &&
                                    selectedEndDate.getMonth() === currentStartDate.getMonth() &&
                                    selectedEndDate.getFullYear() === currentStartDate.getFullYear()) {
                                    // If the date is the same, make sure the selected time is greater than the start time
                                    return time > currentStartDate;
                                } else {
                                    // If the date is different, allow any time on the selected end date
                                    return true;
                                }
                            }}
                        />
                    </div>
                    <CFormFeedback invalid>Please select examination date and time</CFormFeedback>
                </CCol>

                <CCol md={4}>
                    <CFormLabel>Select Duration</CFormLabel>
                    <Select
                        name="exam_duration"
                        value={formData.duration_value}
                        options={[
                            { value: '30M', label: '30 M' },
                            { value: '1H', label: '1 H' },
                            { value: '1.5H', label: '1.5 H' },
                            { value: '2H', label: '2 H' },
                            { value: '2.5H', label: '2.5 H' },
                            { value: '3H', label: '3 H' },
                            { value: '3.5H', label: '3.5 H' },
                            { value: '4H', label: '4 H' },
                            { value: '4.5H', label: '4.5 H' }


                            // Add more options as needed
                        ]}
                        onChange={handleDurationChange}
                        placeholder="Select Duration"

                    />

                </CCol>

                <CCol md={4}>
                    <CFormLabel>Total Marks</CFormLabel>
                    <CFormInput
                        type="number"
                        placeholder="Enter total marks"
                        name="total_marks"
                        required
                        value={formData.total_marks}
                        onChange={handleChange}
                    />
                    <CFormFeedback invalid>Please enter total marks</CFormFeedback>
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
            <FormsCustom customStyles={CustomStyles} title="Examination Master" />

            <DataTable columns={columns} data={data} />

        </>
    );
}

export default Exam;

Exam.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            _id: PropTypes.number.isRequired,
        }),
    }),
};
