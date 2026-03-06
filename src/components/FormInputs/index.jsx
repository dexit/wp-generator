import React from 'react';
import General from './General/index.jsx';
import Advanced from './Advanced/index.jsx';
import Shortcodes from './Shortcodes/index.jsx';
import MetaBoxes from './MetaBoxes/index.jsx';
import PostType from './PostType/index.jsx';
import Taxonomy from './Taxonomy/index.jsx';
import UserRoles from './UserRoles/index.jsx';
import Blocks from './Blocks/index.jsx';
import AdminScreens from './AdminScreens/index.jsx';
import SettingsRegister from './Settings/index.jsx';
import RestApiCallbacks from './RestApi/index.jsx';
import Assets from './Assets/index.jsx';

const FormInputs = () => {
    return (
        <div className="form-inputs">
            <General />
            <Advanced />
            <Shortcodes />
            <MetaBoxes />
            <PostType />
            <Taxonomy />
            <UserRoles />
            <Blocks />
            <AdminScreens />
            <SettingsRegister />
            <RestApiCallbacks />
            <Assets />
        </div>
    );
};

export default FormInputs;
