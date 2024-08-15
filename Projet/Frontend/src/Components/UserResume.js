import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import './UserResume.css'; 

class UserResume extends React.Component {
    handleFileInputChange = (event) => {
        const file = event.target.files[0];
        this.props.updateState('cv', file);
        console.log('Nouveau curriculum vitae sélectionné :', file.name);
    };

    render() {
        const { cv } = this.props;
        return (
            <Segment className="segment">
                {cv && (
                    <div>
                        <Icon name="file" size="big" className="file-icon" />
                        <a href={cv} target="_blank" rel="noopener noreferrer" className="resume-link">See your resume</a>
                    </div>
                )}
                <div className="file-input-container">
                    <br />
                    <label htmlFor="resume-input" className="file-label">
                        <Icon name="file" size="big" className="file-icon2" />
                        <input
                            type="file"
                            id="resume-input"
                            accept=".pdf,.doc,.docx"
                            onChange={this.handleFileInputChange}
                        />
                    </label>
                    <span className="selected-file">
                        {cv ? `Selected resume : ${cv.name}` : 'Choose a file'}
                    </span>
                </div>
            </Segment>
        );
    }
}

export default UserResume;
