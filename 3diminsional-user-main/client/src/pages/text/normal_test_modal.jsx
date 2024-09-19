import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import html2canvas from 'html2canvas';

const NormalTextModal = ({ show, onHide }) => {
    const [text, setText] = useState('');
    const [color, setColor] = useState('#000000');
    const [rotation, setRotation] = useState(0);
    const [fontSize, setFontSize] = useState(16); // New state for font size

    const handleTextChange = (e) => setText(e.target.value);
    const handleColorChange = (color) => setColor(color.hex);
    const handleRotationChange = (e) => setRotation(e.target.value);
    const handleFontSizeChange = (e) => setFontSize(e.target.value); // Handle font size change

    const handleDownload = () => {
        const textElement = document.querySelector('#textCanvas div');
        const originalFontSize = textElement.style.fontSize;

        // Temporarily increase the font size
        textElement.style.fontSize = ` 150px`;

        html2canvas(document.querySelector('#textCanvas')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'text-image.png';
            link.click();

            // Revert the font size back to original after download
            textElement.style.fontSize = originalFontSize;
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Text</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formText">
                        <Form.Label column sm="3">Text</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={text} onChange={handleTextChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formColor">
                        <Form.Label column sm="3">Color</Form.Label>
                        <Col sm="9">
                            <SketchPicker color={color} onChangeComplete={handleColorChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRotation">
                        <Form.Label column sm="3">Rotation</Form.Label>
                        <Col sm="9">
                            <Form.Control type="number" value={rotation} onChange={handleRotationChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formFontSize">
                        <Form.Label column sm="3">Font Size</Form.Label>
                        <Col sm="9">
                            <Form.Control type="number" value={fontSize} onChange={handleFontSizeChange} />
                        </Col>
                    </Form.Group>
                </Form>
                <div id="textCanvas" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div style={{ 
                        display: 'inline-block',
                        color,
                        fontSize: `${fontSize}px`, // Apply the font size
                        transform: `rotate(${rotation}deg)`,
                        border: '1px solid #ccc',
                        padding: '10px'
                    }}>
                        {text}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleDownload}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NormalTextModal;
