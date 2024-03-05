// CloudinaryUpload.js
import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ImgUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'your_cloudinary_upload_preset');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        formData
      );

      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.File
              id="imageFile"
              label="Choose an image file"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button onClick={handleUpload}>Upload</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {imageUrl && (
            <Image cloudName="your_cloud_name" publicId={imageUrl}>
              <Transformation width="200" height="200" crop="fill" />
            </Image>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImgUpload;
