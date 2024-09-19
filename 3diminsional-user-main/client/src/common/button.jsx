import { Button } from 'react-bootstrap';
import style from './button.module.css'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { useSelector } from 'react-redux';
 
import Cookies from 'js-cookie';
const Button1=({scene})=>{

   
    const routeModelSelected = useSelector((state) => state.model.routeModelSelected);

    
    const downloadModel = () => {
        if (!scene) {
          console.error("Scene is not loaded yet.");
          return;
        }
    
        const exporter = new GLTFExporter();
        exporter.parse(
          scene,
          (gltf) => {
            const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
          
            
            const timestamp = Date.now();

        const uniqueName = `${routeModelSelected}${timestamp}.gltf`
       
       
         const formData = new FormData();
          formData.append('file', blob, `${uniqueName}`);
      

          const token = Cookies.get("accessToken");
         
 fetch('http://localhost:3000/api/admin/userpurchase/upload', {
            method: 'POST',
            body: formData,
             credentials: 'include',
             headers: {
              'Authorization': `Bearer ${token}`, 
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


            {/*    
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
            link.href = url;
            link.download = 'model.gltf';
            link.click();
            URL.revokeObjectURL(url);

            */}
          },
          (error) => {
            console.error('An error occurred during parsing', error);
          }
        );
      };



return(
<Button 

      
        className={style.modernbutton}
       onClick={downloadModel} >
Buy
</Button>

)


}
export default Button1