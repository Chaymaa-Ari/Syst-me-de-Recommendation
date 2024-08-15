import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormField, Radio  } from 'semantic-ui-react';

// Configuration d'Axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

function AddOffer2() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [requiredDegree, setRequiredDegree] = useState('');
  const [jobRequirement, setJobRequirement] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [workMode, setWorkMode] = useState('full-time');
  const [IT, setIT] = useState('yes');
  const [startDate, setStartDate] = useState(new Date());
  const [applicationDeadline, setApplicationDeadline] = useState(new Date());

  const navigate = useNavigate();

  function handleAddOffer(e) {
    e.preventDefault();

    // Création de l'objet FormData
    const formData = new FormData();
    formData.append('jobTitle', jobTitle);
    formData.append('companyName', companyName);
    formData.append('companyAddress', companyAddress);
    formData.append('companyEmail', companyEmail);
    formData.append('salary', salary);
    formData.append('requiredDegree', requiredDegree);
    formData.append('jobRequirement', jobRequirement);
    formData.append('eligibility', eligibility);
    formData.append('jobDescription', jobDescription);
    formData.append('startDate', startDate.toISOString().split('T')[0]);
    formData.append('applicationDeadline', applicationDeadline.toISOString().split('T')[0]);
    formData.append('workMode', workMode); // Ajouter workMode au FormData
    formData.append('IT', IT);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log('Form Data:', formDataObj);
    // Envoi de la requête POST
    client.post("/user/offres_add/", formData)
      .then((res) => {
        console.log("Offer added successfully");
        navigate('/list2'); // Redirigez l'utilisateur vers la page souhaitée après l'ajout
      })
      .catch((error) => {
        console.error("There was an error adding the offer", error);
        window.alert("There was an error adding the offer");
      });
  }

  return (
    <div>
      <div className="offer__container" style={styles.container}>
        <div className="container_child offer_form" style={styles.formWrapper}>
          <form onSubmit={handleAddOffer} style={styles.form}>
            
          <h1 style={styles.header}>ADD OFFER</h1>
   <br></br>
        <div style={styles.formGroup}>
            <div className="inputbox">
              <input required type="text" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              <span>Job Title</span>
              <i></i>
            </div>
            <div className="inputbox">
              <input required type="text" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <span>Company Name</span>
              <i></i>
            </div>
        </div>

          
        <div style={styles.formGroup1}>
          
            <div>
              <label style={styles.label1}>Start Date</label>
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div>
              <label style={styles.label1}>Application Deadline</label>
              <DatePicker  selected={applicationDeadline} onChange={date => setApplicationDeadline(date)} />
            </div>
        </div>


        <div style={styles.formGroup}>
            <div className="inputbox">
              <input required type="text" name="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
              <span>Company Address</span>
              <i></i>
            </div>
            <div className="inputbox">
              <input required type="email" name="companyEmail" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
              <span>Company Email</span>
              <i></i>
            </div>
        </div>


        <div style={styles.formGroup}>
            <div className="inputbox">
              <input required type="text" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
              <span>Salary</span>
              <i></i>
            </div>
            <div className="inputbox">
              <input required type="text" name="requiredDegree" value={requiredDegree} onChange={(e) => setRequiredDegree(e.target.value)} />
              <span>Required Degree</span>
              <i></i>
            </div>
        </div>

            <div className="inputbox"  style={styles.formGroupFull}>
              <input required type="text" name="jobRequirement" value={jobRequirement} onChange={(e) => setJobRequirement(e.target.value)} />
              <span>Job Requirement</span>
              <i></i>
            </div>
            
            <div className="inputbox"  style={styles.formGroupFull}>
              <input required type="text" name="eligibility" value={eligibility} onChange={(e) => setEligibility(e.target.value)} />
              <span>Eligibility</span>
              <i></i>
            </div>
            <div className="workMode"  style={styles.formGroupFull}>
                    <label id="labelSexe">Work mode</label>
                    <select required value={workMode} style={styles.select2} onChange={e => setWorkMode(e.target.value)}>
                      <option value="full-time">full-time</option>
                      <option value="part-time">part time</option>
                      <option value="remote">remote</option>
                    </select>
            </div>
            

            <div className="IT"  style={styles.formGroupFull3}>
                    <label id="IT"> The offer pertains to the IT domain </label>
                    <select required value={workMode} style={styles.select1} onChange={e => setIT(e.target.value)}>
                      <option value="yes">YES</option>
                      <option value="no">NO</option>
                    </select>
            </div>

            <div className="inputbox" style={styles.formGroupFull}>
              <input required type="text" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
              <span>Job Description</span>
              <i></i>
            </div>
            <div>
              <input className="btn btn--form" style={styles.btn} type="submit" value="Add Offer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60px',
        padding: '20px',
    },
  
    form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
        width: '80%',
        marginLeft:'100px',
        borderRadius:'5px',
        borderColor:'black',
    },
    header: {
        color: '#FFC451',
        textAlign: 'center',
        
    },
    select1:{
marginLeft:'15px'
    },
    select2:{
      marginLeft:'15px'
          },
    formGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
      
  },
    formGroup1: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        marginLeft:'40px'
    },
    formGroupFull: {
        marginBottom: '30px',
        width: '85%',
        marginLeft:'40px'
    },
    formGroupFull3: {
      marginBottom: '30px',
      width: '85%',
      marginLeft:'-50px'
  },
    text: {
        flex: '2',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '-1px',
        color:"#FFC451",
        fontWeight:'bold'
        
    },
    label1: {
      color:"#FFC451",
      fontWeight:'bold'
  },
    label: {
      
        flex: '2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginTop: '5px',
        flex: '3',
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginTop: '5px',
        height: '100px',
        width: '100%',
    },
    radioGroup: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
    },
    radioLabel: {
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
    },
    buttonGroup: {
        textAlign: 'center',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '0 10px',
    },
    required: {
        color: 'red',
        marginLeft: '5px',
    },
    btn: {
      
      marginRight: '-400px',
  },
  span:{
marginTop:'-10px',
  },
};
export default AddOffer2;