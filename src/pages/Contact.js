import React, { useState, useEffect, isValidElement } from 'react';
import axios from 'axios';
import { gsap, ScrollToPlugin } from 'gsap/all';
import isEmail from 'validator/lib/isEmail';
import Footer from './Footer';

gsap.registerPlugin(ScrollToPlugin);

const API_PATH = 'api/contact/index.php';

const Contact = props => 
{
    const [newName, setName] = useState('');
    const [newSubject, setSubject] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newMessage, setMessage] = useState('');
    const [myMail, sentMail] = useState({});
    const [emailSent, setMail] = useState(false);
    const [errorMessage, setError] = useState('');
    

    useEffect(() => {
        if(window.scrollY > 0 ) gsap.to(window, {duration: 2, scrollTo:{y:"#contactSection", ease:'power2.inOut', offsetY:100}});
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();

         if(validateForm())
         {
            let data = {name:newName, subject:newSubject, email:newEmail, message:newMessage};

             axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: data
          })
            .then(result => {
                setMail(true);
                sentMail(result.data.sent)
            })
            .catch(error => setError(error.message));
         
        }
    }

    const validateForm = () => {
        let isValid = true;

        if(newName === '')
         {
            isValid = false;
            setError('Please fill out name.');
         }else if(newSubject === '')  {
            isValid = false;
            setError('Please fill out subject.');
         }else if(newEmail === '') {
            isValid = false;
            setError('Please fill out email.');
         }else if(!isEmail(newEmail)) {
            isValid = false;
            setError("Please enter valid email address.");
         }else if(newMessage === '')
         {
            isValid = false;
            setError('Please fill out message.');
         }

        return isValid;
    }
  
    const onInputChange = (e) => {

        switch(e.target.name)
        {
            case 'name':
                setName(e.target.value);
            break;
            case 'subject':
                setSubject(e.target.value);
            break;
            case 'email':
                setEmail(e.target.value);
            break;
            case 'message':
                setMessage(e.target.value);
            break;
        }
    }
    
        return (

            <>
            <div className='gradient-divider margin-bottom--large'></div>

            <section id='contactSection' className='section margin-bottom--xl'>
            <div className='section__content'>
                <h1 className='section__content-title heading--large'>Contact</h1>
                <div className='divider'></div>
                <div className='form'>
                        <form onSubmit={e => handleSubmit(e)} className='form__main'>
                                <input type="text" className='form__main-form-field margin-right--small' name='name' placeholder='NAME' value={newName} onChange={e => onInputChange(e)} />
                                <input type="text" className='form__main-form-field margin-right--small' name='subject' placeholder='SUBJECT' value={newSubject} onChange={e => onInputChange(e)} />
                                <input type="email" className='form__main-form-field' name='email' placeholder='EMAIL' value={newEmail} onChange={e => onInputChange(e)} />
                                <textarea placeholder='MESSAGE' className='form__main-form-field form__main-form-field-message--area' name='message' value={newMessage} onChange={e => onInputChange(e)}></textarea>
                             <a href='#' className='pill-btn' onClick={e => handleSubmit(e)}>submit</a>
                             <div style={{fontSize:'1.8rem', marginTop:'3rem'}}>
                                    {emailSent ? <p>Thank you for contacting us!.</p> : <p style={{color:'red'}}>{errorMessage}</p>}
                             </div>
                        </form>
                 </div>
            </div>
            </section>
            <Footer linkedin='https://www.linkedin.com/in/fgudino/' instagram='https://www.instagram.com/abel121677/'/>

            </>
        )   
}
export default Contact;