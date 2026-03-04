import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const MainMenu = () => {
    const { mainMenu, updateMainMenu } = useGenerator();

    return (
        <Card sectionName="Admin Menu (Optional)">
            <div className="row">
                <FormTextInput label="Page Title" value={mainMenu.pageTitle} onChange={(v) => updateMainMenu('pageTitle', v)} col={6} />
                <FormTextInput label="Menu Title" value={mainMenu.menuTitle} onChange={(v) => updateMainMenu('menuTitle', v)} col={6} />
                <FormTextInput label="Capability" value={mainMenu.capability} onChange={(v) => updateMainMenu('capability', v)} col={6} />
                <FormTextInput label="Menu Slug" value={mainMenu.pageSlug} onChange={(v) => updateMainMenu('pageSlug', v)} col={6} />
            </div>
        </Card>
    );
};

export default MainMenu;
