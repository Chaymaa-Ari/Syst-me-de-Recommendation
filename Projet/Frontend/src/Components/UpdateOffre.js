import React, { useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormField, Radio } from 'semantic-ui-react';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

function UpdateOffer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state;
  const [jobTitle, setJobTitle] = useState(offer.jobTitle);
  const [companyName, setCompanyName] = useState(offer.companyName);
  const [companyAddress, setCompanyAddress] = useState(offer.companyAddress);
  const [companyEmail, setCompanyEmail] = useState(offer.companyEmail);
  const [salary, setSalary] = useState(offer.salary);
  const [requiredDegree, setRequiredDegree] = useState(offer.requiredDegree);
  const [jobRequirement, setJobRequirement] = useState(offer.jobRequirement);
  const [eligibility, setEligibility] = useState(offer.eligibility);
  const [jobDescription, setJobDescription] = useState(offer.jobDescription);
  const [workMode, setWorkMode] = useState(offer.workMode);
  const [IT, setIT] = useState(offer.IT);
  const [startDate, setStartDate] = useState(new Date(offer.startDate));
  const [applicationDeadline, setApplicationDeadline] = useState(new Date(offer.applicationDeadline));

  function handleUpdateOffer(e) {
    e.preventDefault();

    const data = {
        id: offer.id,  // Ajouter l'ID de l'offre ici
        jobTitle,
        companyName,
        companyAddress,
        companyEmail,
        salary,
        requiredDegree,
        jobRequirement,
        eligibility,
        jobDescription,
        startDate: startDate.toISOString().split('T')[0],
        applicationDeadline: applicationDeadline.toISOString().split('T')[0],
        workMode,
        IT
    };

    client.post(`/user/update_offre`, data)
      .then((res) => {
        console.log("Offer updated successfully");
        navigate('/list2');
      })
      .catch((error) => {
        console.error("There was an error updating the offer", error);
        window.alert("There was an error updating the offer");
      });
}


  return (
    <div>
      <div className="offer__container" style={styles.container}>
        <div className="container_child offer_form" style={styles.formWrapper}>
          <form onSubmit={handleUpdateOffer} style={styles.form}>
            <h1 style={styles.header}>Update Offer</h1>
            
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

            <div className="inputbox" style={styles.formGroupFull}>
              <input required type="text" name="jobRequirement" value={jobRequirement} onChange={(e) => setJobRequirement(e.target.value)} />
              <span>Job Requirement</span>
              <i></i>
            </div>

            <div className="inputbox" style={styles.formGroupFull}>
              <input required type="text" name="eligibility" value={eligibility} onChange={(e) => setEligibility(e.target.value)} />
              <span>Eligibility</span>
              <i></i>
            </div>
            <div style={styles.formGroup1}>
    <div>
        <label style={styles.label1}>Start Date</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    </div>
    <div>
        <label style={styles.label1}>Application Deadline</label>
        <DatePicker selected={applicationDeadline} onChange={date => setApplicationDeadline(date)} />
    </div>
</div>

            
<div style={styles.formGroupFull}>
  <label style={styles.text}>Work Mode <span style={styles.required}>*</span></label>
  <div style={styles.radioGroup}>
    <FormField
      control={Radio}
      label='Full-time'
      name='workMode'
      value='full-time'
      checked={workMode === 'full-time'}
      onChange={() => setWorkMode('full-time')}
    />
    <FormField
      control={Radio}
      label='Part-time'
      name='workMode'
      value='part-time'
      checked={workMode === 'part-time'}
      onChange={() => setWorkMode('part-time')}
    />
    <FormField
      control={Radio}
      label='Remote'
      name='workMode'
      value='remote'
      checked={workMode === 'remote'}
      onChange={() => setWorkMode('remote')}
    />
  </div>
</div>

<div className="IT" style={styles.formGroupFull3}>
  <label id="IT"> The offer pertains to the IT domain </label>
  <select required value={IT} style={styles.select1} onChange={e => setIT(e.target.value)}>
    <option value="true">YES</option>
    <option value="false">NO</option>
  </select>
</div>

            <div className="inputbox"
            style={styles.formGroupFull}>
            <input required type="text" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            <span>Job Description</span>
            <i></i>
          </div>
          <div>
            <input className="btn btn--form" style={styles.btn} type="submit" value="Update Offer" />
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
  marginLeft: '100px',
  borderRadius: '5px',
  borderColor: 'black',
},
header: {
  color: '#FFC451',
  textAlign: 'center',
},
select1: {
  marginLeft: '15px'
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
  marginLeft: '40px'
},
formGroupFull: {
  marginBottom: '30px',
  width: '85%',
  marginLeft: '40px'
},
formGroupFull3: {
  marginBottom: '30px',
  width: '85%',
  marginLeft: '-50px'
},
text: {
  flex: '2',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '-1px',
  color: "#FFC451",
  fontWeight: 'bold'
},
label1: {
  color: "#FFC451",
  fontWeight: 'bold'
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
};

export default UpdateOffer;