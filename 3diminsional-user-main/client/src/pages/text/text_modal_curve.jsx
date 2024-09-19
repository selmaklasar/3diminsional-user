import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

const CurveTextModal = ({ show, onHide }) => {
    const [text, setText] = useState('Your Text Here');
    const [color, setColor] = useState('#000000');
    const [radius, setRadius] = useState(200);
    const [fontSize, setFontSize] = useState(50);
    const [rotation, setRotation] = useState(0);
    const [curver, setCurve] = useState(100);
    const [selectedFont, setSelectedFont] = useState('Arial'); 

    const canvasRef = useRef(null);

    const handleTextChange = (e) => setText(e.target.value);
    const handleColorChange = (color) => setColor(color.hex);
    const handleRadiusChange = (e) => setRadius(parseInt(e.target.value, 10));
    const handleFontSizeChange = (e) => setFontSize(parseInt(e.target.value, 10));
    const handleRotationChange = (e) => setRotation(parseInt(e.target.value, 10));
    const handleCurveChange = (e) => setCurve(parseInt(e.target.value, 10));
    const handleFontChange = (e) => setSelectedFont(e.target.value);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Save the canvas state before rotation
                ctx.save();

                // Move the canvas origin to the center and rotate it
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

                // Draw text along a curve starting from left to right with an upward arch
                ctx.font = `bold ${fontSize}px ${selectedFont}`; 
                ctx.fillStyle = color;
                ctx.textAlign = 'center';

                const startY = canvas.height / 2; 
                const startX = 50; 
                const endX = canvas.width - 50;
                const totalLength = endX - startX;

                const angleStep = Math.PI / (text.length - 1);

                for (let i = 0; i < text.length; i++) {
                    const angle = angleStep * i;
                    const x = startX + (totalLength * (i / (text.length - 1)));
                    const y = startY - Math.abs(Math.sin(angle) * curver);
                    ctx.fillText(text[i], x, y);
                }

                ctx.restore();
            }
        }
    }, [text, color, fontSize, rotation, curver, selectedFont]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const originalFontSize = fontSize;

            // Temporarily increase the font size for download
            setFontSize(originalFontSize * 2);

            setTimeout(() => {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

                ctx.font = `bold 80px ${selectedFont}`;
                ctx.fillStyle = color;
                ctx.textAlign = 'center';

                const startY = canvas.height / 2;
                const startX = 50;
                const endX = canvas.width - 50;
                const totalLength = endX - startX;

                const angleStep = Math.PI / (text.length - 1);

                for (let i = 0; i < text.length; i++) {
                    const angle = angleStep * i;
                    const x = startX + (totalLength * (i / (text.length - 1)));
                    const y = startY - Math.abs(Math.sin(angle) * curver);
                    ctx.fillText(text[i], x, y);
                }

                ctx.restore();

                // Download the canvas content as an image
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.setAttribute('download', 'canvas_image.png');
                    downloadLink.setAttribute('href', url);
                    downloadLink.click();
                    URL.revokeObjectURL(url);
                });

                // Reset font size back to the original after download
                setFontSize(originalFontSize);
            }, 100);
        }
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
                    <Form.Group as={Row} controlId="formFontSize">
                        <Form.Label column sm="3">Font Size</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="number"
                                value={fontSize}
                                onChange={handleFontSizeChange}
                                min="10"
                                max="200"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRotation">
                        <Form.Label column sm="3">Rotation</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="number"
                                value={rotation}
                                onChange={handleRotationChange}
                                min="0"
                                max="360"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCurve">
                        <Form.Label column sm="3">Curve</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="number"
                                value={curver}
                                onChange={handleCurveChange}
                                min="0"
                                max="200"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formFont">
                        <Form.Label column sm="3">Font</Form.Label>
                        <Col sm="9">
                            <Form.Control as="select" value={selectedFont} onChange={handleFontChange}>
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Courier New">Courier New</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width="480" height="300" style={{ border: '1px solid #ccc', marginTop: '20px' }}></canvas>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleDownload}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CurveTextModal;
