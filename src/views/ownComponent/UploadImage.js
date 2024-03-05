import React, { useState,useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { FaTimes } from 'react-icons/fa';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
} from "@coreui/react";
import Swal from "sweetalert2";

const UploadImage = ({ onUpload, img }) => {
    const [image, setImage] = useState(img);

    useEffect(() => {
        setImage(img);
    }, [img]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'school_management');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dqdnj2szc/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        setImage(data.secure_url);
        onUpload(data.secure_url);
    };

    const removeImage = async () => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this image!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            setImage('');
            onUpload("");
            const inputElement = document.getElementById('fileInput');
            if (inputElement) {
                inputElement.value = '';
            }
        }


        // onImageChange('')
    };

    return (
        <div>
            {/* <input type="file" onChange={handleUpload} />
       */}
            <CFormInput type="file" id="fileInput" aria-label="file example" accept="image/*" onChange={handleUpload} />
            {image && (
                <div>
                    <div style={{ width: '100px', height: '100px', position: 'relative', margin: "10px" }}>
                        <Image cloudName="dqdnj2szc" publicId={image} width="100" height="100" />
                        <FaTimes onClick={removeImage} style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
