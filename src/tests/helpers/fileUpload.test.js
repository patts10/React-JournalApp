import 'setimmediate';
import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
  cloud_name: 'patts', 
  api_key: '665631823674225', 
  api_secret: 'hWLcK2koNP6gLjdqQLczZnk85sc',
  secure: true
});

describe('Tests on fileUpload helper', () => { 
  
  test('should load file and return an URL', async() => { 
    
    const resp = await fetch('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');
    const blob = await resp.blob();

    const file = new File([blob], 'test.jpg');
    const url = await fileUpload(file);
   
    expect(typeof url).toBe('string');

    //Delete img
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    
    await cloudinary.v2.api.delete_resources(imageId, {}, () => {
    });

   });
  
  test('should return an error', async() => { 
    
    const file = new File([], 'test.jpg');
    const url = await fileUpload(file);
   
    expect(url).toBe(null);
   });

 });