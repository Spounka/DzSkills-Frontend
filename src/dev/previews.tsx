import React from "react";
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import {PaletteTree} from "./palette";
import FullPageLoading from '../components/full-page-loading';

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path='/FullPageLoading'>
                <FullPageLoading />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;