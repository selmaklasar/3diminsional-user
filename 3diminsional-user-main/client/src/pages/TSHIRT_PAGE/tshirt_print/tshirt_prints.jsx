
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIsprint_modal } from '../../../redux/slice/print_modal/print_modal';
import { setDecal_image_selected, setDecal_image_selected_back } from '../../../redux/slice/decal_image';


const Tshirt_3d_prints_modal = ({  selectedSide }) => {
    

    const printImages = [
        "https://img.freepik.com/free-vector/motivational-vector-lettering-poster_250435-1044.jpg?size=626&ext=jpg&ga=GA1.1.1649284447.1725260802&semt=ais_hybrid",
        "https://img.freepik.com/premium-vector/born-be-awesome_1085708-3833.jpg?size=626&ext=jpg&ga=GA1.1.1649284447.1725260802&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/poster-that-says-born-be-awesome_1126821-14747.jpg?size=626&ext=jpg&ga=GA1.1.1649284447.1725260802&semt=ais_hybrid",
        "https://img.freepik.com/free-vector/colorful-hand-peace-sign-with-words-background_23-2148004743.jpg?size=626&ext=jpg&ga=GA1.1.1649284447.1725260802&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/t-shirt-designtshirt-design-templatetshirt-design-mentshirt-design-ideastshirt-design_1102153-984.jpg?size=626&ext=jpg&ga=GA1.1.1649284447.1725260802&semt=ais_hybrid",
    ];

const is_print=useSelector((state) => state.print_modal.isprint_modal);
const dispatch=useDispatch()
 const handleHidePrints = () => {
       dispatch(setIsprint_modal(false))
    };
const handle_print=(index)=>{



if(selectedSide==='F'){


    dispatch(setDecal_image_selected(printImages[index]));
   
  

}
else if(selectedSide==='B'){
  
    dispatch(setDecal_image_selected_back(printImages[index]));
    

}

}


    return (
        <>
        
         
            <Modal centered size="lg" show={is_print} onHide={handleHidePrints}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Print</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            {printImages.map((image, index) => (
                                <Col xs={12} sm={6} md={3} key={index} className="mb-3">
                                    <img src={image} alt={`Print ${index}`} style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={()=>{handle_print(index)}} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHidePrints}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Tshirt_3d_prints_modal;
