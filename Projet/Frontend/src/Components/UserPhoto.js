import React from 'react';
import { Icon, Image, Segment } from 'semantic-ui-react'; 

class UserPhoto extends React.Component {
    handlePhotoInputChange = (event) => {
        const file = event.target.files[0];
        this.props.updateState('image', file);
        console.log('Nouvelle photo de profil sélectionnée :', file.name);
    };

    render() {
        const { image } = this.props;
        return (
            <Segment>
                <div>
                    <Image circular src={image} />
                    <label htmlFor="profile-image-input">
                        <Icon name='camera' size='big' />
                        <input
                            type="file"
                            id="profile-image-input"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={this.handlePhotoInputChange}
                        />
                    </label>
                    <span>{image ? `Selected photo  : ${image.name}` : ' Choose a photo '}</span>
                </div>
            </Segment>
        );
    }
}

export default UserPhoto;
