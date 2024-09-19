import React, { useRef, useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import html2canvas from 'html2canvas';
import styles from './circle_test.module.css'; 

const CircleTextModal = ({ show, onHide }) => {
    const [text, setText] = useState('Your Text Here');
    const [color, setColor] = useState('#000000');
    const [radius, setRadius] = useState(200);
    const [fontSize, setFontSize] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(1120);
    const [canvasHeight, setCanvasHeight] = useState(500);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = color;
                ctx.textAlign = 'center';

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const angleStep = (2 * Math.PI) / text.length;

                for (let i = 0; i < text.length; i++) {
                    const angle = (2 * Math.PI) - angleStep * i;
                    const x = centerX - Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    ctx.fillText(text[i], x, y);
                }

                ctx.restore();
            }
        }
    }, [text, color, radius, fontSize, rotation, canvasWidth, canvasHeight]);

    const handleDownload = () => {
        const originalFontSize = fontSize;
        const originalCanvasWidth = canvasWidth;
        const originalCanvasHeight = canvasHeight;

        setFontSize(fontSize);
        setCanvasWidth(1000);
        setCanvasHeight(1000);

        setTimeout(() => {
            html2canvas(canvasRef.current).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'text-image.png';
                link.click();

                setFontSize(originalFontSize);
                setCanvasWidth(originalCanvasWidth);
                setCanvasHeight(originalCanvasHeight);
            });
        }, 100);
    };

    return (
        <Modal show={show} onHide={onHide} centered size="xl" className={styles.modernmodal}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>Add Text</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formText">
                        <Form.Label column sm="3">Text</Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                value={text} 
                                onChange={(e) => setText(e.target.value)}
                                className={styles.modernInput}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formControls">
                        <Col>
                            <Form.Label>Color</Form.Label>
                            <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
                        </Col>
                        <Col>
                            <Form.Label>Radius</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={radius} 
                                onChange={(e) => setRadius(parseInt(e.target.value))}
                                min="50"
                                max="500"
                                className={styles.modernInput}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Font Size</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={fontSize} 
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                min="10"
                                max="200"
                                className={styles.modernInput}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Rotation</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={rotation} 
                                onChange={(e) => setRotation(parseInt(e.target.value))}
                                min="0"
                                max="360"
                                className={styles.modernInput}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className={styles.canvasPreview}></canvas>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={onHide} className={styles.modalButton}>Close</Button>
                <Button variant="primary" onClick={handleDownload} className={styles.modalButton}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CircleTextModal;
